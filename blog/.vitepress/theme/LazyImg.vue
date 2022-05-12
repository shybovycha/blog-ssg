<template>
    <img :data-src="props.src" :alt="props.alt" ref="$elt" />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const $elt = ref();

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: String,
});

onMounted(() => {
    const loadImage = () => {
        $elt.value.src = $elt.value.dataset.src;
    };

    const handleIntersect = (entries, observer) => {
        entries
            .filter(e => e.isIntersecting)
            .forEach(e => {
                loadImage();
                observer.unobserve($elt.value);
            });
    };

    const createObserver = () => {
        const options = {
            root: null,
            threshold: "0",
        };

        const observer = new IntersectionObserver(handleIntersect, options);

        observer.observe($elt.value);
    };

    if ("IntersectionObserver" in window) {
        createObserver();
    } else {
        loadImage();
    }
});
</script>