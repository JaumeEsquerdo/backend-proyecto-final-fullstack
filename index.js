import express from 'express';

import {PORT, DOMAIN} from './config/config.js' //config

import {conectarDB} from './db/mongoose.js'

import cors from 'cors' //para q funcione el fetch a un front
import router from './routes/index.routes.js';