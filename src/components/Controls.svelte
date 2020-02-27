<script>
  import Button from '@smui/button';
  import {Label, Icon} from '@smui/common';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import IconButton from '@smui/icon-button';
  import Textfield from '@smui/textfield';
  import Slider from '@smui/slider';
  import { day, dayIdx, dayHeader, numberOfDays, numberOfDays0 } from '../store';

  const timeStep = 1000; // ms
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

  const reset = () => {
    $dayIdx = 0;
  };

  startTimer();
</script>


<div class="container">
  {#if $numberOfDays > 0}
    <Textfield bind:value={$dayIdx} label="Day index" type="number" on:change={stopTimer} min={0} max={$numberOfDays0}/>

    <div class="day-slider">
      <Slider bind:value={$dayIdx} min={0} max={$numberOfDays0} step={1} discrete displayMarkers />
    </div>

    <IconButton class="material-icons" on:click={() => {stopTimer(); dayPrev()}}>skip_previous</IconButton>
    <IconButton class="material-icons" on:click={() => {stopTimer(); dayNext()}}>skip_next</IconButton>

    <span>{$day}</span>

    <!--<input type=range bind:value={$dayIdx} on:change={stopTimer} min=0 max={$numberOfDays0}>-->

    <Button on:click={toggleTimer} variant="unelevated" color="secondary">
      <Icon class="material-icons">{ isRunning ? 'pause' : 'play_arrow' }</Icon><Label>{ isRunning ? 'pause' : 'play' }</Label>
    </Button>
    <Button on:click={reset} disabled={$dayIdx == 0}  variant="unelevated" color="secondary">
      <Icon class="material-icons">replay</Icon><Label>restart</Label>
    </Button>

    <FormField>
      <Checkbox bind:checked={loop} />
      <span>Loop</span>
    </FormField>
  {/if}
</div>

<style>
.day-slider {
  display: inline-block;
  width: 30%;
}
</style>
