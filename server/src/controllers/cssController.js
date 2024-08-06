const postcss = require('postcss');
const cssnano = require('cssnano');
const prettier = require('prettier');

exports.css = async (req, res) => {
    const { css, type } = req.body;
    
    if (!css || !type) return res.send({ status: 400, message: 'Malformed Body' });

    try {
        if(type === 'minify') {
            const result = await postcss([cssnano]).process(css, { from: undefined });
            return res.send({ status: 200, message: 'Success', result: result.css });

        } else if (type === 'unminify') {
            const result = await prettier.format(css, { parser: 'css' });
            return res.send({ status: 200, message: 'Success', result: result });

        } else {
            return res.send({ status: 400, message: 'Invalid Type' });
        }
    } catch (error) {
        return res.send({ status: 500, message: 'Invalid Css' });
    }

}