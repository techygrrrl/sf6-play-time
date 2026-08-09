const init = () => {
  console.log('🎮 initializing sf6-play-time')

  // Get the data
  const dataString = document.getElementById('__NEXT_DATA__')
    .innerHTML
    .replace('`', '{')
    .replace('`', '}')

  const allData = JSON.parse(dataString)

  const playTimeList = allData.props.pageProps.play.base_info.content_play_time_list

  // Create table element
  const tableEl = document.createElement('table');
  tableEl.style = 'max-width: 100%; min-width: 380px; margin: 30px 0 30px 78px; font-variant-numeric: tabular-nums;'

  // Create and append header row
  const headerRow = document.createElement('tr');

  const thContent = document.createElement('th');
  thContent.textContent = 'Content';
  thContent.style = 'text-align: left; font-weight: 700;'

  const thPlayTime = document.createElement('th');
  thPlayTime.textContent = 'Play time';
  thPlayTime.style = 'text-align: right; font-weight: 700;'

  headerRow.appendChild(thContent);
  headerRow.appendChild(thPlayTime);
  tableEl.appendChild(headerRow);

  // Populate data rows
  playTimeList
    .sort((a, b) => b.play_time - a.play_time) // descending (biggest first)
    .forEach(({ play_time, content_type_name }) => {
      const row = document.createElement('tr');

      const contentCell = document.createElement('td');
      contentCell.textContent = content_type_name;

      const timeCell = document.createElement('td');
      timeCell.textContent = formatPlayTime(play_time);
      timeCell.style = 'text-align: right;'

      row.appendChild(contentCell);
      row.appendChild(timeCell);
      tableEl.appendChild(row);
    });

  // Put it under the chart
  const targetElement = document.querySelector('[class^="play_data_time__"], [class*=" play_data_time__"]');

  targetElement.appendChild(tableEl);
}

try {
  init()
} catch (e) {
  console.error('sf6-play-time error', e)
}


function formatPlayTime(seconds) {
  const numberFormatter = new Intl.NumberFormat('en-US')

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  return `${numberFormatter.format(hours)} hours, ${minutes} mins`;
};
