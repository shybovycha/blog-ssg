<template>
    <main>
        <article>
            <header>
                <h1>{{ page.title }}</h1>

                <Date :date="date" />
            </header>

            <Content />
        </article>
    </main>
</template>

<script setup>
import { computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import { format as formatDate, parseISO as parseISODate } from 'date-fns';

import { data as posts } from '../posts.data';

import Date from './Date.vue';

const { frontmatter: page } = useData();

const route = useRoute();

const postIndex = posts.findIndex(({ href }) => href === route.path);

const date = parseISODate(posts[postIndex].timestamp);
</script>
