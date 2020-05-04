<script>
  import Button from '@smui/button';
  import {Label, Icon} from '@smui/common';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import IconButton from '@smui/icon-button';
  // import Textfield from '@smui/textfield';
  import Slider from '@smui/slider';
  import { dayIdx, numberOfDays, numberOfDays0 } from '../store';

  const timeStep = 300; // ms
  let loop = false;
  let isRunning = false;
  let interval;

  const dayNext = () => {
    ++$dayIdx;
    if ($dayIdx > $numberOfDays0) {
      if (loop) {
        $dayIdx = 0;
      } else {
        $dayIdx = $numberOfDays0;
        stopTimer()
      }
    }
  };

  const dayPrev = () => {
      --$dayIdx;
      if ($dayIdx < 0) {
        $dayIdx = 0;
      }
  };

  const onTimer = () => {
    dayNext();
  };

  const startTimer = () => {
    if (!isRunning) {
      isRunning = true;
      interval = setInterval(onTimer, timeStep);
    }
  };
  const stopTimer = () => {
    if (isRunning) {
      isRunning = false;
      clearInterval(interval)
    }
  };
  const toggleTimer = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };
  const play = () => {
    if ($dayIdx == $numberOfDays0) {
      toStart();
    }
    toggleTimer();
  };

  const toStart = () => {
    $dayIdx = 0;
  };
  const toEnd = () => {
    $dayIdx = $numberOfDays0;
  };

  startTimer();
</script>

<p class="by">
  Created by <a href="https://dreamonward.com/">DreamOnward</a>.
</p>

<div class="container">
  {#if $numberOfDays > 0}
    <!--<Textfield bind:value={$dayIdx} label="Day index" type="number" on:change={stopTimer} min={0} max={$numberOfDays0}/>-->

    <div class="day-slider">
      <Slider bind:value={$dayIdx} min={0} max={$numberOfDays0} step={1} discrete displayMarkers />
    </div>

    <div class="direct-control"><!-- groups items to display on small screen-->
      <div class="skip-btn"><IconButton class="material-icons" on:click={() => {stopTimer(); toStart()}} disabled={$dayIdx == 0}>skip_previous</IconButton></div>
      <div class="skip-btn"><IconButton class="material-icons" on:click={() => {stopTimer(); dayPrev()}}>navigate_before</IconButton></div>
      <div class="skip-btn"><IconButton class="material-icons" on:click={() => {stopTimer(); dayNext()}}>navigate_next</IconButton></div>
      <div class="skip-btn"><IconButton class="material-icons" on:click={() => {stopTimer(); toEnd()}} disabled={$dayIdx == $numberOfDays0}>skip_next</IconButton></div>
    </div>

    <div class="button-wrapper">
      <Button on:click={play} variant="unelevated" color="secondary">
        <Icon class="material-icons">{ isRunning ? 'pause' : 'play_arrow' }</Icon><div class="play-reset-label"><Label>{ isRunning ? 'pause' : 'play' }</Label></div>
      </Button>
    </div>

    <div class="loop-wrapper">
      <FormField>
        <Checkbox bind:checked={loop} />
        <span>Loop</span>
      </FormField>
    </div>
  {/if}
</div>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: .5em .5rem .5rem;
}
.direct-control {
  display: flex;
}
.skip-btn {
  margin-top: -.5em; /* counteract margin inside Material ui button */
  margin-top: .5em;
  color: #138786;
}
.day-slider {
  flex: 1 1 auto;
  width: 40%;
  min-width: 200px;
  max-width: 50%;
  margin-top: -3px;
}

.button-wrapper {
  margin: 0 .5em;
}
.by {
  float: right;
  text-align: right;
  vertical-align: bottom;
  color: gray;
  font-size: 0.5rem;
}
.loop-wrapper {
  margin-top: -.5em;
}
@media(max-width: 415px) {
  .loop-wrapper {
    display: none;
  }
}
@media(max-width: 1000px) {
  .container {
    margin: .5em 0 .2em;
  }
  .by {
    display: none;
  }
}
@media(orientation: landscape) {
  @media(max-width: 800px) {
    .play-reset-label {
      display: none;
    }
    .loop-wrapper {
      display: none;
    }
  }
}
</style>
