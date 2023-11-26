export const stripHtmlOfTags = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, '');
};
