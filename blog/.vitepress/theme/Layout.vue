<template>
    <nav class="top">
        <div class="links">
            <a class="nav-link nav-item {% if page.url == '/' %}active{% endif %}" href="/">Home</a>
            <a class="nav-link nav-item {% if page.url == '/about/' %}active{% endif %}" href="/about/">About</a>
        </div>
    </nav>

    <main>
        <Home v-if="isHomepage" />
        <Post v-else />
    </main>

    <footer v-if="!isHomepage">
        <nav>
            <div class="prev" v-if="hasPreviousPage">
                <a :href="previousPageHref" class="prev">&larr; Previous page</a>
            </div>

            <div class="current">Page #{{ currentPage }} of {{ numPages }}</div>

            <div class="next" v-if="hasNextPage">
                <a :href="nextPageHref" class="next">Next page &rarr;</a>
            </div>
        </nav>
    </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vitepress';

import { data as posts } from '../posts.data';

import Home from './Home.vue';
import Post from './Post.vue';

const route = useRoute();

const isProduction = computed(() => process.env.NODE_ENV !== 'development');
const isHomepage = computed(() => route.path.replace(/index\.html$/, '') === '/');

const currentPage = 1;
const numPages = 10;
const hasPreviousPage = true;
const hasNextPage = true;
const previousPageHref = '/';
const nextPageHref = '/';

// const numPages = computed(() => posts.length);
// const pageIndex = computed(() => posts.findIndex(({ href }) => href === route.path));

// const hasPreviousPage = computed(() => !isHomepage && pageIndex > 0);
// const hasNextPage = computed(() => !isHomepage && pageIndex < posts.length - 1);
</script>
