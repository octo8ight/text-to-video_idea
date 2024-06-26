const axios = require('axios');
require('dotenv').config();

const Controller = () => {
    const getData = async (req, res) => {
        const { keyword } = req.body;

        try {

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${process.env.API_KEY}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  "model": "openai/gpt-3.5-turbo",
                  "messages": [
                    {"role": "system", "content": `Generate 6 video ideas related to the keyword/phrase, not answer`},
                    {"role": "user", "content": keyword},
                  ],
                })
            });
            
            const data = await response.json();
            const content = data.choices[0].message.content;

            let result = content.split('\n');
            // result = result.map(async (item) => {
            //     const text = item.replace(/\"/g, "");
            //     return text;
            // })

            let newResult = await Promise.all(result.map(async (item) => {
                let text = item.replace(/\"/g, "");
                text = text.substr(3, text.length);
                const response_1 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${process.env.API_KEY}`,
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      "model": "openai/gpt-3.5-turbo",
                      "messages": [
                        {"role": "system", "content": `Generate 6 video ideas related to the keyword/phrase, not answer`},
                        {"role": "user", "content": text},
                      ],
                    })
                });
                const elements = await response_1.json();

                return {
                    text: text,
                    childs: elements.choices[0].message.content.split('\n')
                }

            }))

            newResult = newResult.map(item => {
                const childs = item.childs.filter(element => element.length != 0).map(element => {
                    let data = element.replace(/\"/g, "");
                    return data.substr(3, data.length);
                });
                return {
                    text: item.text,
                    childs
                }
            })

            return res.status(200).send({
                success: true,
                data: newResult
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    }
    return {
        getData
    }
}

module.exports = Controller();