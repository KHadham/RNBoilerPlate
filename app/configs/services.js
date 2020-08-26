/* eslint-disable max-len */
import { API_URL } from 'react-native-dotenv';
import { get, post, postWithProgress } from './networking';

export const endpoint = {
  addReminder: async params => post('api/v1/rundown/add-reminder', params),
  statusclaim: async params =>
    post('api/v1/games/treasure-hunt/claim-user', params),
  deleteReminder: async params =>
    post('api/v1/rundown/delete-reminder', params),
  deleteContactChat: async params =>
    post('api/v1/inbox/delete-list-contact', params),
  detailAgenda: async eventId =>
    get(`api/v1/rundown/all-rundown?eventId=${eventId}&status=true`),
  detailRundown: async (rundownId, language) =>
    get(`api/v1/rundown/detail?rundownId=${rundownId}&language=${language}`),
  detailPartner: async (eventId, partnerId) =>
    get(`api/v1/partners/detail?eventId=${eventId}&partnerId=${partnerId}`),
  docsList: async (eventId, page, size, key) =>
    get(
      `api/v1/documents/list-all?eventId=${eventId}&page=${page}&size=${size}&search=${key}`
    ),
  eventDetail: async params => post('api/v1/events/detail', params),
  eventHelp: async eventId => get(`api/v1/settings/help/detail/${eventId}`),
  eventFAQ: async eventId => get(`api/v1/settings/faq/list?eventId=${eventId}`),
  eventList: async params => post('api/v1/events/list/all', params),
  eventRegist: async params =>
    post('api/v1/events/registration-member', params),
  forgotPassword: async params => post('api/v1/users/forgot-password', params),
  formRegist: async id => get(`api/v1/events/form-registration/${id}`),
  gallery: async params => post('api/v1/gallerys/all', params),
  getCategory: async cachedControll =>
    get('api/v1/events/categories', {}, cachedControll),
  getCatFilter: async language =>
    get(`api/v1/events/categories?language=${language}`),
  getPartner: async (eventId, page, size) =>
    get(
      `api/v1/partners/list-all?eventId=${eventId}&page=${page}&size=${size}`
    ),
  getJoinHistory: async (page, size, type, language) =>
    get(
      `api/v1/users/profile-event?page=${page}&size=${size}&type=${type}&language=${language}`
    ),
  getmyGallery: async (page, size) =>
    get(`api/v1/users/profile-gallery?page=${page}&size=${size}`),
  getProfile: async () => get('api/v1/users/profile'),
  getProfileById: async id => get(`api/v1/users/profile/${id}`),
  getFillEvent: async language =>
    get(`api/v1/events/search/filter/list?language=${language}`),
  getContact: async id => get(`api/v1/inbox/display-contact/${id}`),
  getLocation: async cachedControll =>
    get('api/v1/events/regencies', {}, cachedControll),
  getMyQR: async eventId => get(`api/v1/events/my-qr/${eventId}`),
  getSession: async (eventId, page, size, search) =>
    get(
      `api/v1/questions/all?eventId=${eventId}&page=${page}&size=${size}&search=${search}`
    ),
  getFeedwall: async (eventId, size, page, search, accesBy) =>
    get(
      `api/v1/feedwall/all?eventId=${eventId}&size=${size}&page=${page}&search=${search}&accesBy=${accesBy}`
    ),
  getDetailFeedwall: async (eventId, feedwallId, accesBy) =>
    get(
      `api/v1/feedwall/detail?eventId=${eventId}&feedwallId=${feedwallId}&accesBy=${accesBy}`
    ),
  getGames: async (eventId, page, size, search) =>
    get(
      `api/v1/games/all?eventId=${eventId}&page=${page}&size=${size}&search=${search}`
    ),
  getMyProfileGames: async eventId =>
    get(`api/v1/games/treasure-hunt/get-user?eventId=${eventId}`),
  getDetailGames: async (eventId, size, page, search) =>
    get(
      `api/v1/games/treasure-hunt/participant?eventId=${eventId}&size=${size}&page=${page}&search=${search}`
    ),
  homeEvent: async params => post('api/v1/events/detail', params),
  invitationCode: async params => post('api/v1/events/invitation-code', params),
  isRegistered: async id => get(`api/v1/events/check-member/${id}`),
  unRegistration: async eventId =>
    post(`api/v1/events/unregistration-member/${eventId}`),
  likeGallery: async params => post('api/v1/gallerys/like', params),
  likeFeedwall: async params => post('api/v1/feedwall/feature-like', params),
  deleteGallery: async params => post('api/v1/gallerys/delete-by-user', params),
  listAgenda: async (id, page, size) =>
    get(`api/v1/agenda/list?eventId=${id}&page=${page}&size=${size}`),
  listExhibition: async (id, page, size, search) =>
    get(
      `api/v1/exhibition/list-exhibition?eventId=${id}&page=${page}&size=${size}&search=${search}`
    ),
  detailExhibition: async (id, exhId) =>
    get(
      `api/v1/exhibition/detail-exhibition?eventId=${id}&exhibitionId=${exhId}`
    ),
  listNews: async params => post('api/v1/news/all', params),
  listDetailNews: async params => post('api/v1/news/detail', params),
  login: async params => post('api/v1/users/login', params),
  loginFB: async params => post('api/v1/users/login-with-fb', params),
  logout: async () => get('api/v1/users/logout'),
  questionDetail: async (eventId, questionId) =>
    get(`api/v1/questions/detail?eventId=${eventId}&questionId=${questionId}`),
  rateCheck: async eventID => get(`api/v1/feedback/event-one/${eventID}`),
  rateCheckSpeaker: async (eventID, speakerId) =>
    get(
      `api/v1/feedback/speakers-one?eventId=${eventID}&speakerId=${speakerId}`
    ),
  rateEvents: async params => post('api/v1/feedback/event', params),
  rateSpeaker: async params => post('api/v1/feedback/speakers', params),
  rateExhibition: async params => post('api/v1/feedback/exhibitor', params),
  register: async params => post('api/v1/users/save', params),
  resendCode: async email => get(`api/v1/users/resend-code/${email}`),
  searchFiltEvent: async params => post('api/v1/events/search/filter', params),
  scanQR: async params => post('api/v1/events/absent-member', params),
  scanQREvent: async params => post('api/v1/events/absent-qr-event', params),
  scanQRGames: async params =>
    post('api/v1/games/treasure-hunt/qrcode/scan', params),
  speakerDetail: async (eventId, speakerId) =>
    get(`api/v1/speakers/detail?eventId=${eventId}&speakerId=${speakerId}`),
  speakerDetailRate: async (eventId, speakerId) =>
    get(
      `api/v1/feedback/speakers-one?eventId=${eventId}&speakerId=${speakerId}`
    ),
  exhibitionRate: async (eventId, exhibitionId) =>
    get(
      `api/v1/feedback/exhibitor-one?eventId=${eventId}&exhibitionId=${exhibitionId}`
    ),
  speakerList: async (eventId, page, size, key) =>
    get(
      `api/v1/speakers/list-all?eventId=${eventId}&page=${page}&size=${size}&search=${key}`
    ),
  streamingList: async (eventId, page, size) =>
    get(
      `api/v1/streaming/list-all?eventId=${eventId}&page=${page}&size=${size}`
    ),
  updateProfile: async params => post('api/v1/users/update-profile', params),
  updateProfileSocmed: async params =>
    post('api/v1/users/update-profile-google', params),
  updatePassword: async params => post('api/v1/users/update-password', params),
  uploadPhoto: async (params, progress) =>
    postWithProgress('api/v1/gallerys/upload', params, progress),
  uploadPhotoProfile: async params =>
    post('api/v1/users/update-profile-picture', params),
  uploadCvProfile: async (params, progress) =>
    postWithProgress('api/v1/users/update-cv-file', params, progress, true),
  venueAll: async params => post('api/v1/venue/all', params),
  refreshToken: async params => post('api/v1/users/refresh-token', params),
  verifyChangePhoneNumber: async params =>
    post('api/v1/users/verify-phone-number', params),
  verifyCode: async (email, code) =>
    get(`api/v1/users/verify?email=${email}&code=${code}`),
  verifyEmail: async params => post('api/v1/users/verify-email', params),
  eventAll: async params => post('api/v1/events/list/all', params),
  eventWishlist: async params => post('api/v1/events/wishlist/all', params),
  editorPick: async params => post('api/v1/events/editor-pick/list', params),
  saveWishlist: async eventID => get(`api/v1/events/save-wishlist/${eventID}`),
  whosGoing: async params => post('api/v1/events/list-member', params),
  room: async (id, user) => get(`api/v1/inbox/detail-inbox/${user}/${id}`),
  sendMessage: async params => post(`api/v1/inbox/send-message`, params),
  clearMessages: async params =>
    post(`api/v1/inbox/clear-history-chat`, params),
  updateRoomStatus: async params =>
    post(`api/v1/inbox/change-status-room`, params),
  checkInbox: async params => post(`api/v1/inbox/check-inbox-admin`, params),
  checkVersion: async (platform, version) =>
    get(`api/v1/settings/version/check?platform=${platform}&versi=${version}`),
  socket: url => `${API_URL}socket.io/${url}`,
  getAllVote: async (eventId, page, size, search) =>
    get(
      `api/v1/vote/all?eventId=${eventId}&page=${page}&size=${size}&search=${search}`
    ),
  getResultVote: async (eventId, voteId) =>
    get(`api/v1/vote/result-vote-mobile?eventId=${eventId}&voteId=${voteId}`),
  addVote: async params => post('api/v1/vote/add-vote', params),
  addFeedWall: async params => post('api/v1/feedwall/add', params),
  editFeedWall: async params => post('api/v1/feedwall/edit', params),
  deleteFeedWall: async params => post('api/v1/feedwall/delete', params),
  getComments: async (eventId, feedwallId, size, page) =>
    get(
      `api/v1/feedwall/all-comment?eventId=${eventId}&accesBy=Mobile&feedwallId=${feedwallId}&size=${size}&page=${page}`
    ),
  addComment: async params => post(`api/v1/feedwall/add-comment`, params),
  deleteComment: async params => post(`api/v1/feedwall/delete-comment`, params),
  getGameHistory: async (eventId, size, page) =>
    get(
      `api/v1/games/treasure-hunt/qrcode/history?eventId=${eventId}&page=${page}&size=${size}`
    ),
  scanGames: async params =>
    post(`/api/v1/games/treasure-hunt/qrcode/scan`, params),
  getFriendList: async (page, size, search) =>
    get(`api/v1/friend/all-friend?page=${page}&size=${size}&search=${search}`),
  getFriendRequest: async (page, size, search) =>
    get(
      `api/v1/friend/all-request-friend?page=${page}&size=${size}&search=${search}`
    ),
  addFriendScanQr: async userId =>
    post(`api/v1/friend/add-friend-qrcode/${userId}`),
  addFriendByButton: async userId => post(`api/v1/friend/add-friend/${userId}`),
  acceptFriend: async userId => post(`api/v1/friend/accept-friend/${userId}`),
  denyFriend: async userId => post(`api/v1/friend/deny-friend/${userId}`),
  deleteFriend: async userId => post(`api/v1/friend/delete-friend/${userId}`),
  listAbsentEvent: async params =>
    post(`api/v1/events/list-absent-event`, params),
  dismissAbsentEvent: async params =>
    post(`api/v1/events/dismiss-absent-event`, params),
  checkAbsentEvent: async params =>
    post(`api/v1/events/check-absent/${params}`),
  checkInboxFriend: async params =>
    post(`api/v1/inbox/check-inbox-friend`, params),
  getAllCountry: async () => get(`api/v1/users/all-country`)
};

export default { endpoint };
