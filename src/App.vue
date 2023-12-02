<template>

  <!-- if you want make the props dynamic, then you should use : -->
  <ScoreBoard :userScore="this.scoreInfo.userScore" :computerScore="this.scoreInfo.computerScore"/>

  <!-- we have to ensure that the data “answers” is ready before looping or displaying -->
  <template v-if="this.question">

    <!--  because you work with components, so you should use "this" -->
    <h1 v-html="this.question"></h1>
    <div class="radio-btn-group">
      <!-- adding ":key" is good and must for looping -->
      <template v-for="(ans, index) in this.answers" :key="index">
        <div class="radio-btn-label">
          <input
            type="radio"
            name="options"
            :value="ans"
            v-model="this.userAnswer"
            :disabled="this.answerSubmitted"
            >
            <!-- reset all to unchecked again -->

          <label style="margin-left: 3px;" v-html="ans"></label><br>
        </div>
      </template>
    </div>
    <button @click="this.handleSend()" v-if="!this.answerSubmitted" class="send-btn" type="button">Send</button>

    <!-- here a section  to show the answer result only after the answer is submitted -->
    <section v-if="this.answerSubmitted">
      <h4 v-if="!this.answerCorrect" v-html=" '&#10060; wrong, the correct answer is' +  this.correctAnswers"></h4>
      <h4 v-else>congres! right answer</h4>
      <button @click="this.handleNext()" class="next-btn" type="button">next</button>
    </section>

  </template>

</template>

<script>

// import kinder component
import ScoreBoard from "./components/ScoreBoard.vue"

export default {


  // this is the name of "App" component
  name: 'App',

  components: {
    // ScoreBoard: ScoreBoard
    ScoreBoard
  },

  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswers: undefined,
      userAnswer: undefined,
      answerCorrect: false,
      // status if the user has submitted the answer or not
      answerSubmitted: false,

      scoreInfo: {
        userScore: 0,
        computerScore: 0,
      }

    }
  },

  // this is computed properties
  computed: {
    // 会自动创建 variable "answers",你就可以当作 data 一样用了。
    answers() {
      //let answers = this.incorrectAnswers; // 你这样写的话 就默认了2 way data binding，incorrectAnswers 就会和 answers 的内容一模一样了
      let answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
      //Math.random() * (this.incorrectAnswers.length + 1)  ===》  比如 0～answer长度 的 random number，
      // Math.random() generates a floating-point number in the range of [0, 1),
      answers.splice(Math.floor(Math.random() * (this.incorrectAnswers.length + 1)), 0, this.correctAnswers);  // index  ,  number of items to be removed   ,  item shoule be inserted
      return answers;
    }
  },

  methods: {
    getQuestion() {
      this.axios
        .get('https://opentdb.com/api.php?amount=1&category=18')
        .then((res) => {
          // update the data
          this.question = res.data.results[0].question;
          this.incorrectAnswers = res.data.results[0].incorrect_answers;
          this.correctAnswers = res.data.results[0].correct_answer;
        })
    },

    handleSend() {
      // user has to select before sending
      if(!this.userAnswer) {
        alert("Bro you have to choose something before sneding");
      } else {
        // update answerSubmitted 状态，及时 disable button
        this.answerSubmitted = true;

        if(this.userAnswer === this.correctAnswers) {
          this.answerCorrect = true;
          this.scoreInfo.userScore++;

        } else {
          this.answerCorrect = false;
          this.scoreInfo.computerScore++;
        }

        // save into the localStorage
        localStorage.setItem("score-info", JSON.stringify(this.scoreInfo));
      }
    },

    handleNext() {
      this.getQuestion();
      // reset status "answerSubmitted"
      this.answerSubmitted = false;
      this.userAnswer = undefined; // 选选kuang复位
      this.question = undefined; // you won't see the template untill after you received the question via the api
    }
  },

  // when do the http request?  after created and before the template is rendered
  created() {

    // get scoreInfo from localStorage
    // created() 是在 template 被 render 之前， 所以不用害怕 kinder temptale 没有 得到数据
    this.scoreInfo = localStorage.getItem("score-info") ? JSON.parse(localStorage.getItem("score-info")) : this.scoreInfo;
    this.getQuestion();
  },
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;
  // becuase we use scss

  .radio-btn-group {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .radio-btn-label {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      input[type=radio] {
        margin: 12px 5px;
      }
    }
  }

  button.send-btn {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: skyblue;
    border: 1px solid skyblue;
    cursor: pointer;
  }

  button.next-btn {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: red;
    border: 1px solid red;
    cursor: pointer;
  }

}
</style>
