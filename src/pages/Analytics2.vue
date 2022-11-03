<template>
    <div>
        <!--<page-title :heading=heading :subheading=subheading :icon=icon></page-title>-->
        
        

    </div>

</template>
  
  <script>

    // import PageTitle from "../../Layout/Components/PageTitle.vue";
    // import VuePerfectScrollbar from 'vue-perfect-scrollbar';

    // import chart1 from './Analytics/chart1';
    // import chart2 from './Analytics/chart2';
    // import chart3 from './Analytics/chart3';

    import {library} from '@fortawesome/fontawesome-svg-core';
    import {
        faTrashAlt,
        faCheck,
        faCalendarAlt,
        faAngleDown,
        faAngleUp,
        faTh,
    } from '@fortawesome/free-solid-svg-icons';
    // import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

    library.add(
        faTrashAlt,
        faCheck,
        faAngleDown,
        faAngleUp,
        faTh,
        faCalendarAlt,
    );

    export default {
        components: {
            // PageTitle,
            // VuePerfectScrollbar,
            // 'font-awesome-icon': FontAwesomeIcon,
            // chart1,
            // chart2,
            // chart3,

        },
        data: () => ({
            heading: 'Analytics Dashboard',
            subheading: 'This is an example dashboard created using build-in elements and components.',
            icon: 'pe-7s-plane icon-gradient bg-tempting-azure',
        }),

        methods: {},

    };


</script>
