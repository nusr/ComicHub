module.exports = {

    parser: 'babel-eslint',
    extends: ['prettier', 'prettier/@typescript-eslint'],
    plugins: ['@typescript-eslint', 'react'],
    env: {
        commonjs: true,
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true,
    },
    globals: {
        page: true,
    },
    // parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2019,
        // ECMAScript modules 模式
        sourceType: 'module',
        ecmaFeatures: {
            // 不允许 return 语句出现在 global 环境下
            globalReturn: false,
            // 开启全局 script 模式
            impliedStrict: true,
            jsx: true,
        },
        // 即使没有 babelrc 配置文件，也使用 babel-eslint 来解析
        requireConfigFile: false,
        // 仅允许 import export 语句出现在模块的顶层
        allowImportExportEverywhere: false,
    },

    rules: {
        /**
         * 一个缩进必须用四个空格替代
         * @category Stylistic Issues
         * @fixable
         */
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true,
            },
        ],
        /**
         * 重载的函数必须写在一起
         * @category TypeScript
         * @reason 增加可读性
         */
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        /**
         * 限制数组类型必须使用 Array<T> 或 T[]
         * @category TypeScript
         * @reason 允许灵活运用两者
         * @fixable
         */
        '@typescript-eslint/array-type': 'off',
        /**
         * 是否允许使用 // @ts-ignore 来忽略编译错误
         * @category TypeScript
         * @reason 既然已经使用注释来忽略编译错误了，说明已经清楚可能带来的后果
         */
        '@typescript-eslint/ban-ts-ignore': 'off',
        /**
         * 禁用特定的类型
         * @category TypeScript
         * @reason 该规则用于禁止某个具体的类型的使用
         * @fixable
         */
        '@typescript-eslint/ban-types': 'off',
        /**
         * 变量名必须是 camelcase 风格的
         * @category TypeScript
         * @reason 很多 api 或文件名都不是 camelcase
         */
        '@typescript-eslint/camelcase': 'off',
        /**
         * 类名与接口名必须为驼峰式
         * @category TypeScript
         */
        '@typescript-eslint/class-name-casing': 'error',
        /**
         * 函数返回值必须与声明的类型一致
         * @category TypeScript
         * @reason 编译阶段检查就足够了
         */
        '@typescript-eslint/explicit-function-return-type': 'off',
        /**
         * 必须设置类的成员的可访问性
         * @category TypeScript
         * @reason 将不需要公开的成员设为私有的，可以增强代码的可理解性，对文档输出也很友好
         */
        '@typescript-eslint/explicit-member-accessibility': 'error',
        /**
         * 约束泛型的命名规则
         * @category TypeScript
         */
        '@typescript-eslint/generic-type-naming': 'off',
        /**
         * 接口名称必须已 I 开头
         * @category TypeScript
         */
        '@typescript-eslint/interface-name-prefix': 'off',
        /**
         * 接口和类型别名的成员之间必须使用分号分隔
         * @category TypeScript
         * @fixable
         */
        '@typescript-eslint/member-delimiter-style': 'error',
        /**
         * 私有成员必须以 _ 开头
         * @category TypeScript
         * @reason 已有 private 修饰符了，没必要限制变量名
         */
        '@typescript-eslint/member-naming': 'off',
        /**
         * 指定类成员的排序规则
         * @category TypeScript
         * @reason 优先级：
         * 1. static > instance
         * 2. field > constructor > method
         * 3. public > protected > private
         */
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',
                    'static-field',
                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',
                    'static-method',
                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',
                    'public-field',
                    'protected-field',
                    'private-field',
                    'instance-field',
                    'field',
                    'constructor',
                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',
                    'public-method',
                    'protected-method',
                    'private-method',
                    'instance-method',
                    'method',
                ],
            },
        ],
        /**
         * 类型断言必须使用 as Type，禁止使用 <Type>
         * @category TypeScript
         * @reason <Type> 容易被理解为 jsx
         */
        '@typescript-eslint/no-angle-bracket-type-assertion': 'error',
        /**
         * 禁止使用 Array 构造函数
         * @category TypeScript
         * @fixable
         */
        '@typescript-eslint/no-array-constructor': 'off',
        /**
         * 禁止定义空的接口
         * @category TypeScript
         */
        '@typescript-eslint/no-empty-interface': 'error',
        /**
         * 禁止使用 any
         * @category TypeScript
         */
        '@typescript-eslint/no-explicit-any': 'off',
        /**
         * 禁止定义没必要的类，比如只有静态方法的类
         * @category TypeScript
         */
        '@typescript-eslint/no-extraneous-class': 'off',
        /**
         * 禁止对 array 使用 for in 循环
         * @category TypeScript
         */
        '@typescript-eslint/no-for-in-array': 'off',
        /**
         * 禁止给一个初始化时直接赋值为 number, string 的变量显式的指定类型
         * @category TypeScript
         * @reason 可以简化代码
         * @fixable
         */
        '@typescript-eslint/no-inferrable-types': 'error',
        /**
         * 禁止在接口中定义 constructor，或在类中定义 new
         * @category TypeScript
         */
        '@typescript-eslint/no-misused-new': 'off',
        /**
         * 禁止使用 namespace 来定义命名空间
         * @category TypeScript
         * @reason 使用 es6 引入模块，才是更标准的方式。
         * 允许使用 declare namespace ... {} 来定义外部命名空间
         */
        '@typescript-eslint/no-namespace': [
            'error',
            {
                allowDeclarations: true,
                allowDefinitionFiles: true,
            },
        ],
        /**
         * 禁止使用 non-null 断言（感叹号）
         * @category TypeScript
         * @reason 使用 non-null 断言时就已经清楚了风险
         */
        '@typescript-eslint/no-non-null-assertion': 'off',
        /**
         * 禁止对对象字面量进行类型断言（断言成 any 是允许的）
         * @category TypeScript
         */
        '@typescript-eslint/no-object-literal-type-assertion': 'error',
        /**
         * 禁止给类的构造函数的参数添加修饰符
         * @category TypeScript
         */
        '@typescript-eslint/no-parameter-properties': 'error',
        /**
         * 禁止使用 require
         * @category TypeScript
         * @reason 有时需要动态引入，还是需要用 require
         */
        '@typescript-eslint/no-require-imports': 'off',
        /**
         * 禁止将 this 赋值给其他变量，除非是解构赋值
         * @category TypeScript
         */
        '@typescript-eslint/no-this-alias': 'error',
        /**
         * 禁止使用三斜杠引入类型定义文件
         * @category TypeScript
         * @reason 三斜杠是已废弃的语法
         */
        '@typescript-eslint/no-triple-slash-reference': 'error',
        /**
         * 禁止使用类型别名
         * @category TypeScript
         */
        '@typescript-eslint/no-type-alias': 'off',
        /**
         * 在命名空间中，可以直接使用内部变量，不需要添加命名空间前缀
         * @category TypeScript
         * @reason 已经禁止使用命名空间了
         * @fixable
         */
        '@typescript-eslint/no-unnecessary-qualifier': 'off',
        /**
         * 禁止无用的类型断言
         * @category TypeScript
         * @fixable
         */
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        /**
         * 禁止出现未使用的变量
         * @category TypeScript
         * @reason 编译阶段检查就足够了
         */
        '@typescript-eslint/no-unused-vars': 'off',
        /**
         * 禁止在定义变量之前就使用它
         * @category TypeScript
         * @reason 编译阶段检查就足够了
         */
        '@typescript-eslint/no-use-before-define': 'off',
        /**
         * 禁止出现没必要的 constructor
         * @category TypeScript
         */
        '@typescript-eslint/no-useless-constructor': 'error',
        /**
         * 禁止使用 require 来引入模块
         * @category TypeScript
         * @reason 统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入
         */
        '@typescript-eslint/no-var-requires': 'error',
        /**
         * 可以简写为函数类型的接口或字面类似，必须简写
         * @category TypeScript
         * @reason reason
         * @fixable
         */
        '@typescript-eslint/prefer-function-type': 'error',
        /**
         * 优先使用接口而不是字面类型
         * @category TypeScript
         * @reason 接口可以 implement extend 和 merge
         * @fixable
         */
        '@typescript-eslint/prefer-interface': 'error',
        /**
         * 禁止使用 module 来定义命名空间
         * @category TypeScript
         * @reason module 已成为 js 的关键字
         * @fixable
         */
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        /**
         * async 函数的返回值必须是 Promise
         * @category TypeScript
         * @reason 有时 async 函数在某个分支是同步的，不需要返回 Promise
         */
        '@typescript-eslint/promise-function-async': 'off',
        /**
         * 使用加号时，两者必须同为数字或同为字符串
         * @category TypeScript
         */
        '@typescript-eslint/restrict-plus-operands': 'off',
        /**
         * 类型定义的冒号前面必须没有空格，后面必须有一个空格
         * @category TypeScript
         * @fixable
         */
        '@typescript-eslint/type-annotation-spacing': 'error',
        /**
         * 函数重载时，若能通过联合类型将两个函数的类型声明合为一个，则使用联合类型而不是两个函数声明
         * @category TypeScript
         */
        '@typescript-eslint/unified-signatures': 'error',
        /**
         * 布尔值类型的 propTypes 的 name 必须为 is 或 has 开头
         * @category React
         * @reason 不强制要求写 propTypes
         */
        'react/boolean-prop-naming': 'off',
        /**
         * 一个 defaultProps 必须有对应的 propTypes
         * @category React
         * @reason 不强制要求写 propTypes
         */
        'react/default-props-match-prop-types': 'off',
        /**
         * 组件必须有 displayName 属性
         * @category React
         * @reason 不强制要求写 displayName
         */
        'react/display-name': 'off',
        /**
         * 禁止在自定义组件中使用一些指定的 props
         * @category React
         * @reason 没必要限制
         */
        'react/forbid-component-props': 'off',
        /**
         * 禁止使用一些指定的 elements
         * @category React
         * @reason 没必要限制
         */
        'react/forbid-elements': 'off',
        /**
         * 禁止直接使用别的组建的 propTypes
         * @category React
         * @reason 不强制要求写 propTypes
         */
        'react/forbid-foreign-prop-types': 'off',
        /**
         * 禁止使用一些指定的 propTypes
         * @category React
         * @reason 不强制要求写 propTypes
         */
        'react/forbid-prop-types': 'off',
        /**
         * 禁止使用数组的 index 作为 key
         * @category React
         * @reason 太严格了
         */
        'react/no-array-index-key': 'off',
        /**
         * 禁止使用 dangerouslySetInnerHTML
         * @category React
         * @reason 没必要限制
         */
        'react/no-danger': 'off',
        /**
         * 禁止在 componentDidMount 里面使用 setState
         * @category React
         * @reason 同构应用需要在 didMount 里写 setState
         */
        'react/no-did-mount-set-state': 'off',
        /**
         * 禁止在一个文件创建两个组件
         * @category React
         * @reason 有一个 bug https://github.com/yannickcr/eslint-plugin-react/issues/1181
         */
        'react/no-multi-comp': 'off',
        /**
         * 禁止使用 setState
         * @category React
         * @reason setState 很常用
         */
        'react/no-set-state': 'off',
        /**
         * 禁止出现 HTML 中的属性，如 class
         * @category React
         * @fixable
         */
        'react/no-unknown-property': 'error',
        /**
         * 禁止出现未使用的 propTypes
         * @category React
         * @reason 不强制要求写 propTypes
         */
        'react/no-unused-prop-types': 'off',
        /**
         * 定义过的 state 必须使用
         * @category React
         * @reason 没有官方文档，并且存在很多 bug： https://github.com/yannickcr/eslint-plugin-react/search?q=no-unused-state&type=Issues&utf8=%E2%9C%93
         */
        'react/no-unused-state': 'off',
        /**
         * 必须使用 pure function
         * @category React
         * @reason 没必要限制
         */
        'react/prefer-stateless-function': 'off',
        /**
         * 组件必须写 propTypes
         * @category React
         * @reason 不强制要求写 propTypes
         */
        'react/prop-types': 'off',
        /**
         * 出现 jsx 的地方必须 import React
         * @category React
         * @reason 已经在 no-undef 中限制了
         */
        'react/react-in-jsx-scope': 'off',
        /**
         * 非 required 的 prop 必须有 defaultProps
         * @category React
         * @reason 不强制要求写 propTypes
         */
        'react/require-default-props': 'off',
        /**
         * 组件必须有 shouldComponentUpdate
         * @category React
         * @reason 没必要限制
         */
        'react/require-optimization': 'off',
        /**
         * 组件内没有 children 时，必须使用自闭和写法
         * @category React
         * @reason 没必要限制
         * @fixable
         */
        'react/self-closing-comp': 'off',
        /**
         * 组件内方法必须按照一定规则排序
         * @category React
         * @fixable
         */
        'react/sort-comp': 'error',
        /**
         * propTypes 的熟悉必须按照字母排序
         * @category React
         * @reason 没必要限制
         */
        'react/sort-prop-types': 'off',
        /**
         * 布尔值的属性必须显式的写 someprop={true}
         * @category JSX-specific
         * @reason 没必要限制
         * @fixable
         */
        'react/jsx-boolean-value': 'off',
        /**
         * 自闭和标签的反尖括号必须与尖括号的那一行对齐
         * @category JSX-specific
         * @fixable
         */
        'react/jsx-closing-bracket-location': [
            'error',
            {
                nonEmpty: false,
                selfClosing: 'line-aligned',
            },
        ],
        /**
         * 结束标签必须与开始标签的那一行对齐
         * @category JSX-specific
         * @reason 已经在 jsx-indent 中限制了
         * @fixable
         */
        'react/jsx-closing-tag-location': 'off',
        /**
         * 大括号内前后禁止有空格
         * @category JSX-specific
         * @fixable
         */
        'react/jsx-curly-spacing': [
            'error',
            {
                when: 'never',
                attributes: {
                    allowMultiline: true,
                },
                children: true,
                spacing: {
                    objectLiterals: 'never',
                },
            },
        ],
        /**
         * props 与 value 之间的等号前后禁止有空格
         * @category JSX-specific
         * @fixable
         */
        'react/jsx-equals-spacing': ['error', 'never'],
        /**
         * 限制文件后缀
         * @category JSX-specific
         * @reason 没必要限制
         */
        'react/jsx-filename-extension': 'off',
        /**
         * 第一个 prop 必须得换行
         * @category JSX-specific
         * @reason 没必要限制
         * @fixable
         */
        'react/jsx-first-prop-new-line': 'off',
        /**
         * handler 的名称必须是 onXXX 或 handleXXX
         * @category JSX-specific
         * @reason 没必要限制
         */
        'react/jsx-handler-names': 'off',
        /**
         * jsx 的 children 缩进必须为四个空格
         * @category JSX-specific
         * @fixable
         */
        'react/jsx-indent': ['error', 4],
        /**
         * jsx 的 props 缩进必须为四个空格
         * @category JSX-specific
         * @fixable
         */
        'react/jsx-indent-props': ['error', 4],
        /**
         * 限制每行的 props 数量
         * @category JSX-specific
         * @reason 没必要限制
         * @fixable
         */
        'react/jsx-max-props-per-line': 'off',
        /**
         * jsx 中禁止使用 bind
         * @category JSX-specific
         * @reason 太严格了
         */
        'react/jsx-no-bind': 'off',
        /**
         * 禁止在 jsx 中出现字符串
         * @category JSX-specific
         * @reason 没必要限制
         */
        'react/jsx-no-literals': 'off',
        /**
         * 禁止使用 target="_blank"
         * @category JSX-specific
         * @reason 没必要限制
         */
        'react/jsx-no-target-blank': 'off',
        /**
         * props 必须排好序
         * @category JSX-specific
         * @reason 没必要限制
         * @fixable
         */
        'react/jsx-sort-props': 'off',
        /**
         * jsx 的开始和闭合处禁止有空格
         * @category JSX-specific
         * @fixable
         */
        'react/jsx-tag-spacing': [
            'error',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
            },
        ],
        /**
         * 多行的 jsx 必须有括号包起来
         * @category JSX-specific
         * @reason 没必要限制
         * @fixable
         */
        'react/jsx-wrap-multilines': 'off',
        /**
         * 数组中的 jsx 必须有 key
         */
        'react/jsx-key': 'error',
        /**
         * 禁止在 jsx 中使用像注释的字符串
         */
        'react/jsx-no-comment-textnodes': 'error',
        /**
         * 禁止出现重复的 props
         */
        'react/jsx-no-duplicate-props': 'error',
        /**
         * 禁止使用未定义的 jsx elemet
         */
        'react/jsx-no-undef': 'error',
        /**
         * 禁止使用 pascal 写法的 jsx，比如 <TEST_COMPONENT>
         */
        'react/jsx-pascal-case': 'error',
        /**
         * jsx 文件必须 import React
         */
        'react/jsx-uses-react': 'error',
        /**
         * 定义了的 jsx element 必须使用
         */
        'react/jsx-uses-vars': 'error',
        /**
         * 禁止使用 children 做 props
         */
        'react/no-children-prop': 'error',
        /**
         * 禁止在使用了 dangerouslySetInnerHTML 的组建内添加 children
         */
        'react/no-danger-with-children': 'error',
        /**
         * 禁止使用已废弃的 api
         */
        'react/no-deprecated': 'error',
        /**
         * 禁止在 componentDidUpdate 里面使用 setState
         */
        'react/no-did-update-set-state': 'error',
        /**
         * 禁止直接修改 this.state
         */
        'react/no-direct-mutation-state': 'error',
        /**
         * 禁止使用 findDOMNode
         */
        'react/no-find-dom-node': 'error',
        /**
         * 禁止使用 isMounted
         */
        'react/no-is-mounted': 'error',
        /**
         * 禁止在 PureComponent 中使用 shouldComponentUpdate
         */
        'react/no-redundant-should-component-update': 'error',
        /**
         * 禁止使用 ReactDOM.render 的返回值
         */
        'react/no-render-return-value': 'error',
        /**
         * 禁止使用字符串 ref
         */
        'react/no-string-refs': 'error',
        /**
         * 禁止拼写错误
         */
        'react/no-typos': 'error',
        /**
         * 禁止在组件的内部存在未转义的 >, ", ' 或 }
         */
        'react/no-unescaped-entities': 'error',
        /**
         * 禁止在 componentWillUpdate 中使用 setState
         */
        'react/no-will-update-set-state': 'error',
        /**
         * 必须使用 Class 的形式创建组件
         */
        'react/prefer-es6-class': ['error', 'always'],
        /**
         * render 方法中必须有返回值
         */
        'react/require-render-return': 'error',
        /**
         * style 属性的取值必须是 object
         */
        'react/style-prop-object': 'error',
        /**
         * HTML 中的自闭和标签禁止有 children
         */
        'react/void-dom-elements-no-children': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
