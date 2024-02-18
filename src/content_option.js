import React, { useState } from "react";
import hoibao from "./assets/active/hoibao.jpg";
import boyday1911 from "./assets/active/boyday1911.jpg";
import birthday from "./assets/active/birthday.jpg";
import insideout from "./assets/active/insideout.jpg";
import interview2023 from "./assets/active/interview2023.jpg";
import outdoor from "./assets/active/outdoor.jpg";
import training2023 from "./assets/active/training2023.jpg";
import welcomed23 from "./assets/active/welcomed23.jpg";
import womanday from "./assets/active/womanday.jpg";
import womanday2 from "./assets/active/womanday2.jpg";
import teacherday from "./assets/active/teacherday.jpg";
import recruitment from "./assets/active/recruitment.jpg";
import chaotan from "./assets/active/chaotan.jpg";
import trainingd23 from "./assets/active/trainingd23.jpg";
import hoibao2 from "./assets/active/hoibao2.jpg";
import tedhanu from "./assets/active/tedhanu.jpg";
import contest from "./assets/active/contest.jpg";
import training20231 from "./assets/active/training20231.jpg";
import neu from "./assets/active/neu.jpg";
import breakimg from "./assets/active/break2.jpg";
import tvc from "./assets/active/tvc.jpg";
import outdoor1 from "./assets/active/outdoor1.jpg";
import trainingd22 from "./assets/active/trainingd22.jpg";
import pchain from "./assets/active/pchain.jpg";
const logotext = "SO MEDIA";
const meta = {
    title: "So Media",
    description: "We are a photography club at PTIT. At Media Book, you can further develop your media and design skills as well as many interesting and dynamic activities.",
};
const introdata = {
    title: "We are So Media ",
    animated: {
        first: "We love photography",
        second: "We love videography",
        third: "We love design",
    },
    description: "We are a photography club at PTIT. At So Media, you can further develop your media and design skills as well as many interesting and dynamic activities.",
    your_img_url: "https://assets.unlayer.com/stock-templates/1706451135609-homepic.png",
};

const dataabout = {
    title: "Abit about our club",
    aboutme: "Established in 2016 with 3 founding members, So Media is a gathering place for students passionate about photography, videography, and design. Coming to So Media, you will join a dynamic club, always full of positive energy and enthusiasm. Currently So Media is one of the leading photography and videography units in PTIT, participating in almost all large and small activities not only inside but also outside the institute.",
    goals: "So Media's goal is to become a place to connect and develop the passion of students in the field of photography, videography and design. In So Media, the priority is the development of our members. We always strive to create a professional and creative working environment, where members can freely express their ideas and develop their skills.",

};
const worktimeline = [{
    jobtitle: "First prize of the contest 'Net dep truong P' ",
    where: "PTIT",
    date: "2022",
},
{
    jobtitle: "Third prize of the contest 'Dong phuc PTIT' ",
    where: "PTIT",
    date: "2023",
},
{
    jobtitle: "Club has excellent achievements in union activities and youth movements",
    where: "PTIT",
    date: "2022-2023",
},
{
    jobtitle: "Media sponsor of the event welcoming new students D23",
    where: "PTIT",
    date: "2023",
    },
    {
        jobtitle: "And many other Media sponsorship certificates",
        where: "",
        date: "",
    },

];



const services = [
    {
        title: "About training",
        description: "When you apply for the club, you will be trained in some media skills as below",
    }, {
        title: "Photography",
        description: "You will be taught how to use the camera, use editing software, composition and color from basic to advanced.",
    },
    {
        title: "Videography",
        description: "You will learn how to film, how to edit a video, and use tools like Adobe Premere.",
    },
    {
        title: "Design",
        description: "You will learn how to use professional design software such as Photoshop, Ilustrator, Canva, along with layout and color in design to create your own design thinking and creative publications.",
    },

];
const slides = [

    {
        "src": birthday,
        "alt": "Image 1 for carousel",
        "description": "So Media 6th Birthday",
    },
    {
        "src": hoibao,
        "alt": "Image 2 for carousel",
        "description": "National newspaper youth camp 2023",
    },
    {
        "src": boyday1911,
        "alt": "Image 3 for carousel",
        "description": "Men's Day 19/11",
    },
    {
        "src": insideout,
        "alt": "Image 4 for carousel",
        "description": "Inside Out photography contest",
    },
    {
        "src": tvc,
        "alt": "Image 4 for carousel",
        "description": "TVC 2023 - The Growth",
    },
    {
        "src": interview2023,
        "alt": "Image 5 for carousel",
        "description": "So Media Interview 2023",
    },
    {
        "src": outdoor,
        "alt": "Image 6 for carousel",
        "description": "Outdoor photography ",
    },
    {
        "src": outdoor1,
        "alt": "Image 6 for carousel",
        "description": "Street photography ",
    },
    {
        "src": trainingd22,
        "alt": "Image 7 for carousel",
        "description": "Training photography 2022",
    },
    {
        "src": training2023,
        "alt": "Image 7 for carousel",
        "description": "Training photography 2023",
    },
    {
        "src": welcomed23,
        "alt": "Image 8 for carousel",
        "description": "Welcome D23 PTIT",
    },
    {
        "src": pchain,
        "alt": "Image 8 for carousel",
        "description": "Welcome D22 PTIT - The P-chain",
    },
    {
        "src": breakimg,
        "alt": "Image 10 for carousel",
        "description": "Welcome D23 PTIT - Break the Shell 2023",
    },
    {
        "src": womanday,
        "alt": "Image 9 for carousel",
        "description": "Vietnamese Woman's Day",
    },
    {
        "src": womanday2,
        "alt": "Image 10 for carousel",
        "description": "International Women's Day",
    },


];

const dataportfolio = [{
    img: "https://assets.unlayer.com/stock-templates/1706454526536-380272415_644128067824993_6241835109622914696_n.jpg",
    description: "So Media TVC 2023 - The Growth",
    link: "https://www.youtube.com/watch?v=ZrfJXRTsrEo",
},

{
    img: "https://assets.unlayer.com/stock-templates/1706517867378-Screenshot%202024-01-29%20154244.png",
    description: "Profile Shooting 2023",
    link: "https://www.facebook.com/somedia.vn.2016/videos/198116229592288/",
},
{
    img: "https://assets.unlayer.com/stock-templates/1706518644364-Screenshot%202024-01-29%20155655.png",
    description: "DONG PHUC PTIT 2023",
    link: "https://www.facebook.com/somedia.vn.2016/videos/305607272023242",
},
{
    img: "https://assets.unlayer.com/stock-templates/1706518095715-399828778_669829441921522_1834242137200868664_n.jpg",
    description: "TEDxHANU 2023",
    link: "https://www.facebook.com/tedxhanu/videos/1365086274436809",
},
{
    img: "https://assets.unlayer.com/stock-templates/1706518226945-397551449_664880412416425_6495822736177543714_n.jpg",
    description: "KACHOUFUUGETSU HANU",
    link: "https://www.facebook.com/100063582549627/videos/1459914988185464",
},
{
    img: "https://assets.unlayer.com/stock-templates/1706454838255-Screenshot%202024-01-28%20221342.png",
    description: "MV Ngay dau tien PTIT Version ",
    link: "https://www.youtube.com/watch?v=y7Y7VtKb9rY",
},


{
    img: "https://assets.unlayer.com/stock-templates/1706518396742-387207800_652564120314721_4877621676947583441_n.jpg",
    description: "BREAK THE SHELL",
    link: "https://www.facebook.com/photo?fbid=652563173648149&set=pcb.652571926980607",
},
{
    img: "https://assets.unlayer.com/stock-templates/1706615636704-Screenshot%202024-01-30%20184640.png",
    description: "THE P-CHAIN 2022",
    link: "https://www.facebook.com/somedia.vn.2016/videos/941481530159388",
},
{
    img: neu,
    description: "AGRIUP 2023 - NEU",
    link: "https://www.facebook.com/agriup.NEU/videos/2103583136647621",
},


    // {
    //     img: "https://assets.unlayer.com/stock-templates/1706518792689-345846649_261663956353151_7859952513778676032_n.jpg",
    //     description: "INSIDE OUT",
    //     link: "https://www.facebook.com/photo/?fbid=579806644257136&set=pcb.579806707590463",
    // },

];


const contactConfig = {
    YOUR_EMAIL: "clbsomediaptit@gmail.com",
    YOUR_FONE: "(+84) 39 7403 808",
    YOUR_ADDRESS: "Posts and Telecommunications Institute of Technology, Km 10 Nguyen Trai, Hanoi, Vietnam",
    description: "Let's do something interesting together!",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_u6zo9qt",
    YOUR_TEMPLATE_ID: "template_34mz99q",
    YOUR_USER_ID: "uI2wlAs7frUBvbJkG",
};

const socialprofils = {
    facebook: "https://www.facebook.com/somedia.vn.2016",
    instagram: "https://www.instagram.com/so_media_2016/",
    tiktok: "https://www.tiktok.com/@clbsomedia",
    youtube: "https://www.youtube.com/@SoMedia2016"
};
const activitiesData = [
    { time: "September", description: "Recruit members", img: recruitment },
    { time: "October", description: "Major events", img: chaotan },
    { time: "November", description: "Vietnamese Teacher's Day", img: teacherday },
    { time: "November", description: "Event media sponsor", img: tedhanu },
    { time: "December", description: "Training", img: trainingd23 },
    { time: "March", description: "Youth Month activities", img: hoibao2 },
    { time: "April", description: "Club Birthday", img: birthday },
    { time: "May", description: "Photo Contest", img: contest },




];
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
    slides,
    activitiesData,
};