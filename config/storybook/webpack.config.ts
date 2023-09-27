import path from 'path';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        entry: '',
        html: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push('.ts', '.tsx');

    if (config.module?.rules) {
        config.module.rules = config.module.rules.map((rule: RuleSetRule | '...') => {
            // дефолтный лоадер от storybook для обработки файлов svg пропускаем
            // и ниже после цикла будем использовать свой
            if (typeof rule === 'object' && rule.test instanceof RegExp && rule.test.toString().includes('svg')) {
                return { ...rule, exclude: /\.svg$/ };
            }

            return rule;
        });
        config.module?.rules?.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        config.module?.rules?.push(buildCssLoader(true));
    }

    config.plugins?.push(
        new DefinePlugin({
            __IS_DEV__: true,
            __API__: '',
            __PROJECT__: 'storybook',
        })
    );

    return config;
};
