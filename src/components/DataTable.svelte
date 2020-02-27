<script>
  export let dayHeader;
  export let sites;

  let showDerivative = true;
  let showDeaths = false;
  let showRecovered = false;
</script>

<div class="container">
  {#if sites}
  <table>
    <thead>
      <tr>
      <th>Province/State</th>
      <th>Country/Region</th>
      <th>Type</th>
      {#each dayHeader as header}
        <th>{header}</th>
      {/each}
      </tr>
    </thead>
    <tbody>
      {#each sites as site}
        <tr>
          <td>{site.province}</td>
          <td>{site.region}</td>
          <!--<td>{site.lat}</td>-->
          <!--<td>{site.lng}</td>-->
          <td>count</td>

          {#each site.count as count}
              <td>{count}</td>
          {/each}
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td>f'</td>

          {#each site.derivative as derivative}
          <td class="{derivative == 0 ? 'green': ''}">{derivative}</td>
          {/each}
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td>f' average</td>

          {#each site.derivativeA as derivative}
          <td class="{derivative == 0 ? 'green': ''}">{derivative}</td>
          {/each}
        </tr>
      {/each}

    </tbody>
    <!--<tfoot>
      <tr>
        <td>Footer content 1</td>
        <td>Footer content 2</td>
      </tr>
    </tfoot>-->
  </table>
  {:else}
  <p>No data available to show in table</p>
  {/if}
</div>

<style>
.container {
    width: 100%;
    overflow-x: scroll;
}
table, th, td {
    padding: 5px;
    border: 1px solid
    black;
}
table {
    border-collapse: collapse;
    border-spacing: 0px;
}

/* Custom styling */
td.green {
    background-color: green;
}
td.gray {
    background-color: green;
}

</style>
