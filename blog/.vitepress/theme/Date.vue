<template>
    <time>
        {{ date }}
    </time>
</template>

<script setup>
import { format as formatDate, parseISO as parseISODate, isValid as isValidDate } from 'date-fns';

const props = defineProps({
  date: Date,
  fallback: String,
})

const date = isValidDate(props.date) ? `${formatDate(props.date, 'dd MMM yyyy')} at ${formatDate(props.date, 'HH:mm')}` : `${props.fallback} (maybe)`;
</script>
