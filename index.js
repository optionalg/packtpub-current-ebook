#!/usr/bin/env node

/* Copyright (c) 2016, Patrick Bauerochse
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.

 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
const request = require('request');
const cheerio = require('cheerio');
const exec = require('child_process').exec;
const notifier = require('node-notifier');

const packtpubUrl = 'https://www.packtpub.com/packt/offers/free-learning/';

// fetch the html from the free ebook packtpub page
request(packtpubUrl, function(error, response,html) {
  if (!error && response.statusCode == 200) {
    processPacktpubResponse(html);
  }
  // no error handling. if it works, it works.
});

// handle the packtpub response
function processPacktpubResponse(html) {
  const $ = cheerio.load(html);

  const $currentFreeEbookSection = $('.dotd-main-book-summary');
  if ($currentFreeEbookSection.length > 0) {
    displayFreeEbookInformation($currentFreeEbookSection);
  }
}

// extracts the free ebook details from the section and shows a notification
function displayFreeEbookInformation($currentFreeEbookSection) {
  // extract the title
  const $titleSection = $currentFreeEbookSection.find('.dotd-title');
  const ebookTitle = $titleSection.find('h2').text().trim();

  // remove clutter which is not needed for the description
  $titleSection.remove();
  $currentFreeEbookSection.find('.eighteen-days-countdown-bar').remove();

  // extract the description
  const ebookDescription = $currentFreeEbookSection.text().trim();

  showEbookNotification(ebookTitle, ebookDescription);
}

// show notification
function showEbookNotification(title, description) {
  notifier.notify({
    'title': 'Free Packtpub Ebook: ' + title,
    'message': description + '\n\nDownload at: ' + packtpubUrl
  });
}
