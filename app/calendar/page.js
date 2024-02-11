/*
This is a REACT translation of https://github.com/neatnik/calendar

MIT License

Copyright (c) 2022 Neatnik LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
'use client'

import styles from '../styles.module.css'

export default function Page({ searchParams }) {
  const year = searchParams.get('year') || new Date().getFullYear()
  let month = 1
  let day = 1
  const printHalf = searchParams.get('half') || null
  // either null, 1, or 2
  monthFirst = printHalf === 2 ? 7 : 1
  monthLast = printHalf === 1 ? 6 : 12

  let items = []
  let firstDays = []
  let dates = {}

  for (let i = monthFirst; i <= monthLast; i++) {
    let date = new Date().setFullYear(year).setMonth(i).setDay(1)
    items.push(<th>{date.toLocaleString('default', { month: 'long' })}</th>)
    let firstDayName = '' // the properly formatted weekday
    firstDays[i] = firstDayName
    dates[firstDayName] = []
    // second for-loop that builds out the month
  }
  const monthHeadings = <tr>{items}</tr>

  /*
  $date = strtotime(date('Y', $now).'-01-01');
  $first_weekdays = array();

  for($x = 1; $x <= 12; $x++) {
    $first_weekdays[$x] = date('N', strtotime(date('Y', $now).'-'.$x.'-01'));
    $$x = false; // Set a flag for each month so we can track first days below
  }

  // Start the loop around 12 months
  while($month <= 12) {
    $day = 1;
    for($x = 1; $x <= 42; $x++) {
      if(!$$month) {
        if($first_weekdays[$month] == $x) {
          $dates[$month][$x] = $day;
          $day++;
          $$month = true;
        }
        else {
          $dates[$month][$x] = 0;
        }
      }
      else {
        // Ensure that we have a valid date
        if($day > cal_days_in_month(CAL_GREGORIAN, $month, date('Y', $now))) {
          $dates[$month][$x] = 0;
        }
        else {
          $dates[$month][$x] = $day;
        }
        $day++;
      }
    }
    $month++;
  }

  // Now produce the table

  $month = $month_first;
  $day = 1;

  if(isset($_REQUEST['layout']) && $_REQUEST['layout'] == 'aligned-weekdays') {
    // Start the outer loop around 42 days (6 weeks at 7 days each)
    while($day <= 42) {
      echo '<tr>';
      // Start the inner loop around 12 months
      while($month <= $month_last) {
        if($dates[$month][$day] == 0) {
          echo '<td></td>';
        }
        else {
          $date = date('Y', $now).'-'.str_pad($month, 2, '0', STR_PAD_LEFT).'-'.str_pad($dates[$month][$day], 2, '0', STR_PAD_LEFT);
          if(date('N', strtotime($date)) == '7') {
            echo '<td class="weekend">';
          }
          else {
            echo '<td>';
          }
          echo $dates[$month][$day];
          echo '</td>';
        }
        $month++;
      }
      echo '</tr>';
      $month = $month_first;
      $day++;
    }
  }

    else {
      // Start the outer loop around 31 days
      while($day <= 31) {
        echo '<tr>';
        // Start the inner loop around 12 months
        while($month <= $month_last) {
          // If we’ve reached a point in the date matrix where the resulting date would be invalid (e.g. February 30th), leave the cell blank
          if($day > cal_days_in_month(CAL_GREGORIAN, $month, date('Y', $now))) {
            echo '<td></td>';
            $month++;
            continue;
          }
          // If the day falls on a weekend, apply a specific class for styles
          if(DateTime::createFromFormat('!Y-m-d', date('Y', $now).'-'.$month.'-'.$day)->format('N') == 6 || DateTime::createFromFormat('!Y-m-d', date('Y', $now).'-'.$month.'-'.$day)->format('N') == 7) {
            echo '<td class="weekend">';
          }
          else {
            echo '<td>';
          }
          // Display the day number and day of the week
          echo '<span class="date">'.$day.'</span> <span class="day">'.substr(DateTime::createFromFormat('!Y-m-d', date('Y', $now).'-'.$month.'-'.$day)->format('D'), 0, 1).'</span>';
          echo '</td>';
          $month++;
        }
        echo '</tr>';
        $month = $month_first;
        $day++;
      }
    }
  */

  return (
    <>
      <head>
        <title>Calendar</title>
      </head>
      <div className={styles.wrapper}>
        <div classNames={styles.infoSection}>
          <p>
            👋 <strong>Hello!</strong> If you print this page, you’ll get a
            nifty calendar that displays all of the year’s dates on a single
            page. It will automatically fit on a single sheet of paper of any
            size. For best results, adjust your print settings to landscape
            orientation and disable the header and footer.
          </p>
          <p>
            Take in the year all at once. Fold it up and carry it with you. Jot
            down your notes on it. Plan things out and observe the passage of
            time. Above all else, be kind to others.
          </p>
          <p style="font-size: 80%; color: #999;">
            Made by me but forked and then modified from{' '}
            <a href="https://neatnik.net/">Neatnik</a> &#183; Source on
            <a href="https://github.com/michaelsnook/michaelsnook.com/blob/main/app/calendar/">
              GitHub
            </a>
          </p>
        </div>
        <p className={styles.standard}>{year}</p>
        <table>
          <thead>
            <tr>{monthHeadings}</tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  )
}
