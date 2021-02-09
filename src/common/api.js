/** URL адрес API */
export const API_URL = process.env.VUE_APP_API_URL;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
export function getMeetupCoverLink(id) {
  return `${API_URL}/images/${id}`;
}

/**
 * Получает список митапов с API
 * @return {Promise}
 */
export async function fetchMeetups() {
  return fetch(`${API_URL}/meetups`).then(res => res.json());
}

/**
 * Получает список митапов с API по id
 * @return {Promise}
 */
export async function fetchMeetupById(id) {
  return fetch(`${API_URL}/meetups/${id}`).then(res => res.json());
}

export const ImageService = {
  /**
   * Загружает файл на сервер и получает
   * https://course-vue.javascript.ru/api/#/Images/ImagesController_uploadImage
   * @param {File} file - файл, который требуется загрузить
   * @return {Promise<Object>} - объект с ID изображения
   */
  // eslint-disable-next-line no-unused-vars
  uploadImage(file) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: 1 });
      }, 500);
    });
  },

  /**
   * Возвращает ссылку на изображение по ID
   * @param id - ID изображения
   * @return {string} - ссылка на изображение
   */
  getImageURL(id) {
    return id !== null ? `${API_URL}/images/${id}` : null;
  }
};
