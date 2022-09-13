export interface YoutubeVideoDetails {
	title?: string;
	author_name?: string;
	author_url?: string;
	type?: string;
	height?: number;
	width?: number;
	version?: string;
	provider_name?: string;
	provider_url?: string;
	thumbnail_height?: number;
	thumbnail_width?: number;
	thumbnail_url?: string;
	html?: string;
}

export type LinkType = "url" | "id";

export const videoIdToYoutubeUrl = (id: string): string => `https://www.youtube.com/watch?v=${id}`;

const videoUrlToApiUrl = (url: string): string => `https://www.youtube.com/oembed?url=${url}&format=json`;

export interface VideoDetailsParams {
	reference: string;
	type: "url" | "id";
}

const defaultVideoDetails: YoutubeVideoDetails = {
	provider_name: "YouTube",
	provider_url: "https://www.youtube.com/",
};

export async function getVideoDetails(params: VideoDetailsParams): Promise<any> {
	const videoUrl: string = params.type === "id" ? videoIdToYoutubeUrl(params.reference) : params.reference;
	const apiUrl: string = videoUrlToApiUrl(videoUrl);
	try {
		const request: Response = await fetch(apiUrl, { method: "GET" });
		return await request.json();
	} catch (error: unknown) {
		console.error("Error: Fetching Youtube video details");
		console.table(error as Error);
		return JSON.stringify(defaultVideoDetails);
	}
}
