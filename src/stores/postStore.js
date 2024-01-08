import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "../utils/axiosInterceptor";

export const usePostStore = defineStore("postStore", () => {
  const postList = ref([]);
  const postDetails = ref({});
  const postComments = ref({});
  const errorMessage = ref("");

  // computed are same as getters it's just we have to return it using another function
  const allPost = computed(() => postList.value);
  const postInfo = computed(() => postDetails.value);

  function getallPost() {
    return allPost.value;
  }
  function getPostDetails() {
    return postInfo.value;
  }
  function getPostComments() {
    return postComments.value;
  }

  // api call to get all the posts
  async function fetchPosts() {
    try {
      const response = await axios.get("/posts");
      console.log(response);
      postList.value = response.data.posts;
    } catch (error) {
      errorMessage.value = error.message;
    }
  }

  // api call to get single post details
  async function fetchPostDetails(id) {
    postDetails.value = {};
    try {
      const response = await axios.get(`/posts/${id}`);
      postDetails.value = response.data;
      return postDetails.value;
    } catch (error) {
      errorMessage.value = error.message;
    }
  }

  // api call to get post comments
  async function fetchPostComments(id) {
    postComments.value = {};
    try {
      const response = await axios.get(`/posts/${id}/comments`);
      postComments.value = response.data;
      return postComments.value;
    } catch (error) {
      errorMessage.value = error.message;
    }
  }

  return {
    postList,
    fetchPosts,
    errorMessage,
    getallPost,
    getPostDetails,
    fetchPostDetails,
    fetchPostComments,
    getPostComments,
  };
});
