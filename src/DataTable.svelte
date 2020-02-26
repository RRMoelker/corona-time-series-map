<script>
  export let data;

  // const { fullHeader, dayHeader, sites } = data;
</script>

{#if data}
<table>
  <thead>
    <tr>
    <th>Province/State</th>
    <th>Country/Region</th>
      {#each data.dayHeader as header}
        <th>{header}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data.sites as site}
      <tr>
        <td>{site.province}</td>
        <td>{site.region}</td>
        <!--<td>{site.lat}</td>-->
        <!--<td>{site.lng}</td>-->

        {#each site.count as count}
          <td>{count}</td>
  		  {/each}
  		</tr>

  		<tr>
          <td>{site.province}</td>
          <td>{site.region}</td>
          <!--<td>{site.lat}</td>-->
          <!--<td>{site.lng}</td>-->

          {#each site.derivative as derivative}
            <td>{derivative}</td>
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

<style>
table, th, td {
    padding: 5px;
    border: 1px solid
    black;
}
table {
    border-collapse: collapse;
    border-spacing: 0px;
}
</style>
