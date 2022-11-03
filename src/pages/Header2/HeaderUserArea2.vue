<template>
      <div class="d-flex">
          <div class="header-btn-lg pr-0">
              <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                      <div class="widget-content-left">
                        <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
                              <span slot="button-content">
                                  <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                      <img width="42" class="rounded-circle" src="@/assets/images/comgongBOT-logo.png" alt="">

                                    </div>
                              </span>
                              <button type="button" tabindex="0" class="dropdown-item">Menus</button>
                            <button type="button" tabindex="0" class="dropdown-item">Settings</button>
                            <h6 tabindex="-1" class="dropdown-header">Header</h6>
                            <button type="button" tabindex="0" class="dropdown-item">Actions</button>
                            <div tabindex="-1" class="dropdown-divider"></div>
                            <button type="button" tabindex="0" class="dropdown-item">Dividers</button>
                              </b-dropdown>

                              <!--<div class="icon-wrapper rounded-circle">
                                <div class="icon-wrapper-bg opacity-10"></div>
                                <i class="pe-7s-user opacity-8"></i></div>-->





                      </div>
                      <div class="widget-content-left header-user-info">
                          <div class="widget-heading">어드민</div>
                          
                      </div>

                      <div class="widget-content-right header-user-info ml-3">
                        <b-button variant="outline-blue" size="sm">Logout</b-button>
                    </div>


                  </div>
              </div>
          </div>
      </div>
  </template>
  
  <script>
    // import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    import {library} from '@fortawesome/fontawesome-svg-core';
    import {
        faAngleDown,
        faCalendarAlt,
        faTrashAlt,
        faCheck,
        faFileAlt,
        faCloudDownloadAlt,
        faFileExcel,
        faFilePdf,
        faFileArchive,
        faEllipsisH,
    } from '@fortawesome/free-solid-svg-icons';
    // import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

    library.add(
        faAngleDown,
        faCalendarAlt,
        faTrashAlt,
        faCheck,
        faFileAlt,
        faCloudDownloadAlt,
        faFileExcel,
        faFilePdf,
        faFileArchive,
        faEllipsisH,
    );

    export default {
        components: {
            // 'font-awesome-icon': FontAwesomeIcon,
        },
        data: () => ({

        }),

        methods: {}
    };


</script>