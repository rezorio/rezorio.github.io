// API configuration for backend
const API_CONFIG = {
    baseURL: '/api',
    endpoints: {
        generateReviewer: '/generate-reviewer',
        analyzeVideo: '/analyze-video',
    },
};

// API helper functions
async function callBackendAPI(endpoint, data) {
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Backend error' }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

// Generate reviewer from backend
async function requestGeminiReviewer(topic, count, pdfSnippet, videoSummary, format) {
    return callBackendAPI(API_CONFIG.endpoints.generateReviewer, {
        topic,
        count,
        pdfSnippet,
        videoSummary,
        format,
    });
}

// Analyze video via backend
async function analyzeVideoWithGemini(base64Video, mimeType) {
    return callBackendAPI(API_CONFIG.endpoints.analyzeVideo, {
        base64Video,
        mimeType,
    });
}
