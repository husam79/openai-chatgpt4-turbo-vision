import OpenAI from "openai";

const called = async () => {
  const openai = new OpenAI();
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: "an banner contains openai logo with gpt4 vision logo, in nice and clean design, without any unrelated text",
    n: 1,
    size: "1792x1024",
  });
  
  // image_url = response.data.data[0].url;

  // console.log(image_url);

  console.log(JSON.stringify(response))
}


called()
