exports.app = require('./server/functions/app').app;
exports.onFirestoreQuestionWrite = require('./server/functions/db/firebase.functions').onQuestionWrite;
exports.onFirestoreInvitationWrite = require('./server/functions/db/firebase.functions').onInvitationWrite;
exports.onFirestoreGameCreate = require('./server/functions/db/firebase.functions').onGameCreate;
exports.onFirestoreGameUpdate = require('./server/functions/db/firebase.functions').onGameUpdate;
exports.onFirestoreUserCreate = require('./server/functions/db/firebase.functions').onUserCreate;
exports.onFirestoreAccountUpdate = require('./server/functions/db/firebase.functions').onAccountUpdate;
exports.onFirestoreUnpublishedQuestionsUpdate = require('./server/functions/db/firebase.functions').onUnpublishedQuestionsUpdate;
exports.onFirestoreQuestionCreate = require('./server/functions/db/firebase.functions').onQuestionCreate;


