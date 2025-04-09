function getWriter(selector) {
  /** @type HTMLCanvasElement */
  const canvas = document.querySelector('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  return {
    /**
     * 写入本文
     * @param {string} text 文本
     * @param {Object} options 配置
     */
    write(text, options) {

    }
  }
}
