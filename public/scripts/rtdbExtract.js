import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

const db = getDatabase();
const commentsRef = ref(db, "logs/");
onChildAdded(commentsRef, (data) => {
  console.log( data.val());
});

// onChildChanged(commentsRef, (data) => {
//   setCommentValues(postElement, data.key, data.val().text, data.val().author);
// });

// onChildRemoved(commentsRef, (data) => {
//   deleteComment(postElement, data.key);
// });