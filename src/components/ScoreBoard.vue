<template>

  <section class="scoreboard-score">
    Player <span>{{ this.userScore }}</span> X <span>{{ this.computerScore }}</span> Computer
  </section>

</template>


<script>
  export default {

    //  here receive the data from the Vater components
    props: ["userScore", "computerScore"],

    created: {

    }


  }

</script>



<style lang="scss">
  section.scoreboard-score {
    border-bottom: 1px solid black;
    padding: 24px;
    font-size: 18px;

    span {
      padding: 8px;
      font-weight: bold;
      border: 1px solid black;
    }
  }

</style>