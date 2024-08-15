export const imageCache = {
  async getImage(src) {
    const cachedImage = localStorage.getItem(src);
    if (cachedImage) {
      return cachedImage;
    }

    try {
      const response = await fetch(src);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          localStorage.setItem(src, base64data);
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      return null;
    }
  },
};
