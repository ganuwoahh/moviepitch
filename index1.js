const setupTextarea = document.getElementById('setup-textarea');
const sendButton = document.getElementById('send-btn');
const movieBossText = document.getElementById('movie-boss-text');

const apiKey = "";
const url = 'https://api.openai.com/v1/chat/completions'; // Use the chat completions endpoint

// Event listener for send button
sendButton.addEventListener("click", async function() {
    console.log('Send button clicked');
    const promptText = setupTextarea.value.trim(); // Trim whitespace
    console.log('Prompt text:', promptText);

    if (promptText) {
        movieBossText.innerText = `Processing: ${promptText}`;
        try {
            // Fetch response from OpenAI API
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    'model': 'gpt-3.5-turbo',
                    'messages': [{ role: 'user', content: `Analyze the following movie concept: ${promptText}

Provide a comprehensive analysis including:

Genre: Determine the primary and secondary genres.
Logline: Create a concise, engaging summary of the story.
Target Audience: Identify the intended demographic for the film.
Plot Summary: Develop a detailed outline of the story, including major plot points and character arcs.
Character Development: Describe the main characters, their motivations, and conflicts.
Themes: Explore the underlying messages or ideas the film conveys.
Tone: Determine the overall mood and atmosphere of the film.
Actors: Determine suitable actors for these roles.
Visual Style: Suggest potential visual aesthetics and cinematography techniques.
Potential Challenges: Identify potential obstacles or difficulties in bringing the film to fruition.
Market Analysis: Assess the film's commercial potential and target audience appeal.` }],
                    'max_tokens': 1000
                })
            });

            const data = await response.json();
            console.log('Response received:', data);

            if (data.choices && data.choices.length > 0) {
                const botReply = data.choices[0].message.content.trim();
                movieBossText.innerText = botReply;
            } else {
                movieBossText.innerText = "Sorry, I couldn't process that request.";
            }
        } catch (error) {
            console.error('Error:', error);
            movieBossText.innerText = "An error occurred: " + error.message;
        }
    } else {
        movieBossText.innerText = "Please enter a prompt before sending.";
    }
});
