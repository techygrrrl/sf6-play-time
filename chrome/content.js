const init = () => {
  console.log('🎮 initializing sf6-play-time')

  const colours = new Map()
  colours.set(1, '#01bcb5') // world tour
  colours.set(2, '#ea2743') // ranked
  colours.set(3, '#fb8a10') // casual
  colours.set(4, '#6200e3') // custom room
  colours.set(5, '#0a65d8') // battle hub
  colours.set(6, '#f157bc') // offline
  colours.set(7, '#691c2a') // arcade
  colours.set(8, '#d9d9d9') // practice
  colours.set(9, '#cc73ff') // special matches
  colours.set(10, '#007f44') // avatar room

  // Get the data
  const dataString = document.getElementById('__NEXT_DATA__')
    .innerHTML
    .replace('`', '{')
    .replace('`', '}')

  const allData = JSON.parse(dataString)

  const playTimeList = allData.props.pageProps.play?.base_info?.content_play_time_list
  if (!playTimeList) {
    return
  }

  // Create table element
  const tableEl = document.createElement('table');
  tableEl.style = 'width: 100%; margin: 30px; font-variant-numeric: tabular-nums;'

  // Create and append header row
  const headerRow = document.createElement('tr');
  headerRow.style = 'border-bottom: 1px solid #fff;'

  const thContent = document.createElement('th');
  thContent.textContent = 'Content';
  thContent.style = 'text-align: left; font-weight: 700;'

  const thPlayTime = document.createElement('th');
  thPlayTime.textContent = 'Play time';
  thPlayTime.style = 'text-align: right; font-weight: 700; padding: 2px;'

  const thPercentage = document.createElement('th');
  thPercentage.style = 'text-align: center; font-weight: 700;'
  thPercentage.textContent = '%';

  headerRow.appendChild(thContent);
  headerRow.appendChild(thPercentage);
  headerRow.appendChild(thPlayTime);
  tableEl.appendChild(headerRow);

  // Calculate total play time ahead of time
  const totalSeconds = playTimeList.reduce((sum, item) => sum + item.play_time, 0);

  // Populate data rows
  playTimeList
    .sort((a, b) => b.play_time - a.play_time) // descending (biggest first)
    .forEach(({ play_time, content_type, content_type_name }) => {
      const row = document.createElement('tr');
      row.style = 'border-bottom: 1px solid #ffffff3a;'

      const contentCell = document.createElement('td');
      contentCell.style = 'padding: 2px;';

      const colour = colours.get(content_type)
      const circleHtml = `<span style="width: 16px; height: 16px; display: inline-block; margin-right: 2px; margin-bottom: -3px; border-radius: 100%; background-color: ${colour}"></span>`
      contentCell.innerHTML = `${circleHtml} ${content_type_name}`;

      const percentage = totalSeconds > 0
        ? ((play_time / totalSeconds) * 100).toFixed(2)
        : '0';

      const timeCell = document.createElement('td');
      timeCell.textContent = formatPlayTime(play_time);
      timeCell.style = 'text-align: right; white-space: nowrap; padding: 2px;'

      const percentageCell = document.createElement('td');
      percentageCell.style = 'text-align: center; opacity: 0.7;';
      percentageCell.textContent = `${percentage}%`;

      row.appendChild(contentCell);
      row.appendChild(percentageCell);
      row.appendChild(timeCell);
      tableEl.appendChild(row);
    });

  // Create and append total summary row
  const totalRow = document.createElement('tr');

  const totalLabelCell = document.createElement('th');
  totalLabelCell.style = 'text-align: left; font-weight: 700;';
  totalLabelCell.textContent = 'Total';

  const totalValueCell = document.createElement('th');
  totalValueCell.textContent = formatPlayTime(totalSeconds);
  totalValueCell.style = 'padding: 2px; text-align: right; font-weight: 700; white-space: nowrap;';

  totalRow.appendChild(totalLabelCell);
  totalRow.appendChild(document.createElement('td'));
  totalRow.appendChild(totalValueCell);
  tableEl.appendChild(totalRow);

  // Put it under the chart
  const targetElement = document.querySelector('[class^="play_data_time__"], [class*=" play_data_time__"]');
  if (!targetElement) {
    return
  }

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
