export const stripHtmlOfTags = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, '');
};

export const cropText = (title: string, length: number) => {
    if (title.length > 20) {
        return `${title.slice(0, length)}...`;
    } else {
        return title;
    }
};
