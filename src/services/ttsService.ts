import axios from 'axios';

const apiKey = 'sk_ed195f77a79e3de9ea646cedc9c3d2a323939661a273d5e7';
const baseUrl = 'https://api.elevenlabs.io/v1/tts';

export const getSpeech = async (text: string) => {
  try {
    const response = await axios.post(baseUrl, {
      text,
      voice: 'en_us_male', // Specify the voice you want
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.audioUrl;
  } catch (error) {
    console.error('Error fetching speech:', error);
    throw error;
  }
};