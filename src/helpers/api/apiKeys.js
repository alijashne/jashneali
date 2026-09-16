const apiKeys = {
  //astrologer
  login: "auth/astrologer/login",
  signup: "auth/astrologer/signup",
  registration: "auth/astrologer/registration",
  getAstrologerDetails: "astrologer/get/astrologer/details",
  viewAstrologer: "astrologer/get/astrologer/list",
  viewAstroDetails: "astrologer/get/astrologer/details/userId",

  //update Astrologer
  updateProfile: "auth/customer/astrologer/profile/update",

  //update Registration
  updateReg: "astrologer/edit/decline/astrologer",

  //customer
  customerLogin: "auth/customer/login",
  getCustomerDetails: "customer/get/customer/details",
  zodiacSign: "customer/get/zordic/sign",

  //compatibility
  compatible: "horoscope/get/GetCompatibiltyDOB",
  personality: "horoscope/get/personalityReport",

  //horoscope
  daily: "customer/get/daily/horoscope",
  tomorrow: "customer/get/tommorrow/horoscope",
  yesterday: "customer/get/previous/horoscope",
  weekly: "customer/get/weekly/horoscope",
  month: "customer/get/montly/horoscope",

  //kundli
  freeKundli: "kundali/get/kundaliBirthDetails",
  kundliBirthImg: "kundali/get/horoChartBirthImage",
  kundaliNavamsaImg: "kundali/get/horoChartNavamsaImage",
  kundliPlanet: "kundali/get/kundaliPlanets",
  mahaDasha: "kundali/get/kundaliMahadasha",
  antarDasha: "kundali/get/kundaliAntardasha",
  pratyanDasha: "kundali/get/kundaliPratyantardasha",
  sookshmaDasha: "kundali/get/kundaliSookshmadasha",
  pranDasha: "kundali/get/kundaliPrandasha",
  kpPlanet: "kundali/get/kundaliKpPlanets",
  houseCusps: "kundali/get/kundaliKpHouseCusps",
  avakhadaDetails: "kundali/get/kundaliAstroDetails",
  todayPrediction: "kundali/get/dailyNakshatraPrediction",
  generalPrediction: "kundali/get/generalNakshatraReport",
  rudraksh: "kundali/get/kundaliRudrakshaSuggestion",
  gemStone: "kundali/get/kundaliBasicGemSuggestion",
  pooja: "kundali/get/kundaliPujaSuggestion",
  dosha: "kundali/get/kundaliDosha",
  yogini: "kundali/get/kundaliYoginiDasha",
  planetReport: "kundali/get/kundaliGeneralHouseReport",
  vimshotri: "kundali/get/kundaliCurrentVimshottariDasha",
  delete: "customer/delete/kundali/form",
  header: "kundali/get/KeyOfPranDasaha",

  //test
  dosha2: "kundali/get/kundaliDosha2",

  //Kundali matching
  kundaliMatching: "kundali/get/matchBirthDetails",
  ashtakoot: "kundali/get/matchMakingPointAndReport",
  matchReport: "kundali/get/matchMakingReport",

  //saved kundali
  saveKundali: "customer/kundali/form",

  //panchang
  basicPanchang: "horoscope/get/panchangPrediction",
  tamilPanchang: "horoscope/get/tamilPanchangPrediction",

  //numerology
  number: "numerology/get/numerologyreports",
  numberTable: "numerology/get/numerotable",

  //chat
  chatForm: "customer/get/post/chatform",
  declineReq: "customer/no/response/chat",

  // accept from astrologer side
  customerChatReq: "customer/get/post/chatform",
  acceptReject: "customer/accept/reject/chatform",

  //rating
  postRating: "customer/get/post/rating",

  //appointment astrologer
  viewAppointment: "astrologer/get/post/astrologer/appointment",
  addAppointment: "astrologer/get/post/astrologer/appointment",
};

export default apiKeys;
