import resume from '../../static/data/resume.json';

export async function get() {
    return {
        status: 200,
        body: {
            resume
        }
    }
}