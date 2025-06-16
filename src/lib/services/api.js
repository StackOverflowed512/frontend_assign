// src/lib/services/api.js
const BASE_URL = 'http://localhost:3001';
const TIMEOUT_MS = 5000; // 5 second timeout

/**
 * Sends an HTTP request with timeout and error handling
 * @param {string} method - HTTP method
 * @param {string} path - API endpoint path
 * @param {object} [data] - Optional request body
 * @returns {Promise<any>} Response data
 */
async function send(method, path, data) {
    // Input validation
    if (!method || !path) {
        throw new Error('Method and path are required');
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        /** @type {RequestInit} */
        const opts = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        };

        if (data) {
            opts.body = JSON.stringify(data);
        }

        const res = await fetch(`${BASE_URL}/${path}`, opts);

        if (!res.ok) {
            throw new Error(`API Error: ${res.statusText} (Status: ${res.status})`);
        }

        // Return empty object for DELETE, parse JSON for others
        return method === 'DELETE' ? {} : await res.json();

    } catch (err) {
        if (err && typeof err === 'object' && 'name' in err && err.name === 'AbortError') {
            throw new Error(`Request timeout after ${TIMEOUT_MS}ms`);
        }
        if (err && typeof err === 'object' && 'message' in err) {
            throw new Error(`API Request failed: ${err.message}`);
        } else {
            throw new Error('API Request failed: Unknown error');
        }
    } finally {
        clearTimeout(timeout);
    }
}

/**
 * Get all notes
 * @returns {Promise<Array<object>>} Array of notes
 */
export async function getNotes() {
    return send('GET', 'notes');
}

/**
 * Create a new note
 * @param {{title: string, content: string, createdAt: string}} note 
 * @returns {Promise<object>} Created note
 */
export async function createNote(note) {
    if (!note?.title || !note?.content) {
        throw new Error('Note must have title and content');
    }
    return send('POST', 'notes', note);
}

/**
 * Update an existing note
 * @param {number|string} id Note ID
 * @param {{title?: string, content?: string}} note 
 * @returns {Promise<object>} Updated note
 */
export async function updateNote(id, note) {
    if (!id) {
        throw new Error('Note ID is required');
    }
    if (!note?.title && !note?.content) {
        throw new Error('Note must have title or content to update');
    }
    return send('PUT', `notes/${id}`, note);
}

/**
 * Delete a note
 * @param {number|string} id Note ID
 * @returns {Promise<object>} Empty object
 */
export async function deleteNote(id) {
    if (!id) {
        throw new Error('Note ID is required');
    }
    return send('DELETE', `notes/${id}`);
}
