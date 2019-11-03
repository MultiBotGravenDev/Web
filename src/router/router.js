import Vue from 'vue'
import Router from 'vue-router'

import AutomatismPage from '@/pages/AutomatismPage'
import CandidPage from '@/pages/CandidPage'
import LeaderBoardPage from '@/pages/LeaderBoardPage'
import MainPage from '@/pages/MainPage'
import PollPage from '@/pages/PollPage'
import SanctionPage from '@/pages/SanctionPage'
import VotePage from '@/pages/VotePage'
import PrivacyPolicy from '@/pages/PrivacyPolicy'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/automatismes',
            name: 'automatismes',
            component: AutomatismPage,
            meta: {
                auth: true,
                admin: true,
            }
        },
        {
            path: '/candidatures',
            name: 'candidatures',
            component: CandidPage,
            meta: {
                auth: true,
                admin: true,
            }
        },
        {
            path: '/classement',
            name: 'classement',
            component: LeaderBoardPage
        },
        {
            path: '/sondages',
            name: 'sondages',
            component: PollPage,
            meta: {
                auth: true,
                admin: true,
            }
        },
        {
            path: '/sanctions',
            name: 'sanctions',
            component: SanctionPage,
            meta: {
                auth: true,
                admin: true,
            }
        },
        {
            path: '/votes',
            name: 'votes',
            component: VotePage,
            meta: {
                auth: true,
                admin: true,
            }
        },
        {
            path: '/privacy-policy',
            name: 'privacy-policy',
            component: PrivacyPolicy,
            meta: {
                auth: true,
            }
        },
        {
            path: '*',
            name: 'accueil',
            component: MainPage,
            meta: {
                auth: true,
            }
        }
    ]
});

export default router