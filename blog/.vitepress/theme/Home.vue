<script setup>
// import Date from './Date.vue';
import { format as formatDate, isValid as isValidDate, parseISO as parseISODate } from 'date-fns';
import { data as posts } from '../posts.data';
import Date from './Date.vue';
</script>

<template>
  <article v-for="{ title, href, date, timestamp, excerpt, content } of posts">
    <h1><a :href="href">{{ title }}</a></h1>

    <Date :date="parseISODate(timestamp)" :fallback="date" />

    <div v-if="excerpt" v-html="excerpt"></div>
    <div v-else v-html="content" />

    <div>
        <a v-if="excerpt" class="btn btn-md btn-primary read-more" :href="href">Read more</a>
    </div>
  </article>
</template>
