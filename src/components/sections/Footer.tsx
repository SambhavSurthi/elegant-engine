import React from "react";
import { Component as BgGradient } from "@/components/ui/bg-gradient";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import {
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  Github,
  Linkedin,
  ArrowUp,
} from "lucide-react";
// mobile links are generated from dockItems; no extra icon imports needed

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dockItems = [
    {
      title: "Outlook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.47 0 2.96-.37 4.44-1.1l-.88-1.79c-1.21.59-2.4.9-3.56.9-4.41 0-8-3.59-8-8S7.59 4 12 4s8 3.59 8 8v1c0 .69-.31 2-1.5 2-1.4 0-1.49-1.82-1.5-2V8h-2v.03C14.16 7.4 13.13 7 12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.45 0 2.75-.63 3.66-1.62.52.89 1.41 1.62 2.84 1.62 2.27 0 3.5-2.06 3.5-4v-1c0-5.51-4.49-10-10-10m0 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3"></path>
        </svg>
      ),
      href: "mailto:sambhavsurthi.career@outlook.com",
    },
    {
      title: "Twitter - X",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path d="M13.68 10.62 20.24 3h-1.55L13 9.62 8.45 3H3.19l6.88 10.01L3.19 21h1.55l6.01-6.99 4.8 6.99h5.24l-7.13-10.38Zm-2.13 2.47-.7-1-5.54-7.93H7.7l4.47 6.4.7 1 5.82 8.32H16.3z"></path>
        </svg>
      ),
      href: "https://x.com/SambhavSur652",
    },
    {
      title: "Telegram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434"></path>
        </svg>
      ),
      href: "https://t.me/sambhavsurthi",
    },
    {
      title: "Instagram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248m0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008M16.806 6.129a1.078 1.078 0 1 0 0 2.156 1.078 1.078 0 1 0 0-2.156"></path>
          <path d="M20.533 6.111A4.6 4.6 0 0 0 17.9 3.479a6.6 6.6 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.6 6.6 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.6 6.6 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71s0 2.753.056 3.71c.015.748.156 1.486.419 2.187a4.6 4.6 0 0 0 2.634 2.632 6.6 6.6 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.6 6.6 0 0 0 2.186-.419 4.61 4.61 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.6 6.6 0 0 0-.421-2.217m-1.218 9.532a5 5 0 0 1-.311 1.688 2.99 2.99 0 0 1-1.712 1.711 5 5 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a5 5 0 0 1-1.669-.311 2.99 2.99 0 0 1-1.719-1.711 5.1 5.1 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654s0-2.686.053-3.655a5 5 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5 5 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a5 5 0 0 1 1.67.311 3 3 0 0 1 1.712 1.712 5.1 5.1 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655s0 2.698-.043 3.654z"></path>
        </svg>
      ),
      href: "https://www.instagram.com/sambhavv.___/",
    },
    {
      title: "Threads",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path d="M16.39 11.27c-.09-.04-.17-.08-.26-.12-.15-2.84-1.71-4.47-4.32-4.49h-.04c-1.56 0-2.86.67-3.66 1.88l1.44.98c.6-.91 1.53-1.1 2.22-1.1h.02c.86 0 1.51.26 1.93.74.31.35.51.84.61 1.46-.76-.13-1.59-.17-2.47-.12-2.48.14-4.08 1.59-3.97 3.6.05 1.02.56 1.9 1.43 2.47.73.48 1.68.72 2.66.67 1.3-.07 2.32-.57 3.03-1.47.54-.69.88-1.58 1.03-2.7.62.37 1.08.86 1.33 1.45.43 1 .46 2.65-.89 4-1.18 1.18-2.6 1.69-4.74 1.7-2.38-.02-4.17-.78-5.34-2.26-1.09-1.39-1.66-3.4-1.68-5.97.02-2.57.59-4.58 1.68-5.97 1.17-1.49 2.97-2.25 5.34-2.26 2.39.02 4.22.78 5.43 2.28.59.73 1.04 1.65 1.34 2.73l1.68-.45c-.36-1.32-.92-2.46-1.69-3.4-1.56-1.91-3.83-2.89-6.76-2.91h-.01c-2.92.02-5.17 1-6.68 2.92C3.71 6.64 3.01 9.02 2.99 12c.02 3 .72 5.37 2.06 7.08C6.56 21 8.81 21.98 11.73 22h.01c2.6-.02 4.43-.7 5.94-2.21 1.98-1.97 1.92-4.45 1.26-5.97-.47-1.09-1.36-1.97-2.58-2.56Zm-4.49 4.22c-1.09.06-2.22-.43-2.27-1.47-.04-.78.55-1.64 2.34-1.74.2-.01.41-.02.6-.02.65 0 1.26.06 1.81.18-.21 2.57-1.41 2.99-2.48 3.05"></path>
        </svg>
      ),
      href: "https://www.threads.com/@sambhavv.___",
    },
    {
      title: "GitHub",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.6 9.6 0 0 1 2.496-.336 9.6 9.6 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2"
            clip-rule="evenodd"
          ></path>
        </svg>
      ),
      href: "https://github.com/SambhavSurthi",
    },
    {
      title: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path d="M4.983 2.821a2.188 2.188 0 1 0 0 4.376 2.188 2.188 0 1 0 0-4.376M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66zm-6.142 0H6.87v12.139H3.095z"></path>
        </svg>
      ),
      href: "https://www.linkedin.com/in/sambhavsurthi",
    },
    {
      title: "Leetcode",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path d="m15.42 16.94-2.25 2.17a2.1 2.1 0 0 1-1.52.56 2.1 2.1 0 0 1-1.52-.56l-3.61-3.63a2.18 2.18 0 0 1-.58-1.55 2.07 2.07 0 0 1 .58-1.52l3.6-3.65a2.1 2.1 0 0 1 1.53-.54 2.08 2.08 0 0 1 1.52.55l2.25 2.17A1.14 1.14 0 0 0 17 9.33l-2.17-2.2a4.24 4.24 0 0 0-2-1.12l2.06-2.08a1.15 1.15 0 0 0-1.62-1.62l-8.43 8.42a4.48 4.48 0 0 0-1.24 3.2 4.57 4.57 0 0 0 1.24 3.23l3.63 3.63A4.38 4.38 0 0 0 11.66 22a4.45 4.45 0 0 0 3.2-1.25L17 18.56a1.14 1.14 0 0 0-1.61-1.62z"></path>
          <path d="M19.34 12.84h-8.45a1.12 1.12 0 0 0 0 2.24h8.45a1.12 1.12 0 0 0 0-2.24"></path>
        </svg>
      ),
      href: "https://leetcode.com/u/kl_2300031622/",
    },
    {
      title: "TakeYouForward",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path d="M9.71 16.29 5.41 12l4.3-4.29-1.42-1.42L2.59 12l5.7 5.71zM15.71 17.71l5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
        </svg>
      ),
      href: "https://takeuforward.org/plus/profile/SambhavSurthi",
    },
    {
      title: "CodeChef",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M11.257.004q-.554.014-1.1.095c-.54.054-1.08.325-1.675.595c-.757.324-1.515.649-2.218.703c-1.19.378-1.568.919-1.892 1.351c0 .054-.054.108-.054.108c-.433.865-.487 1.73-.325 2.595c.162.541.378 1.029.54 1.515c.38 1.028.758 2 .92 3.136c.163.325.324.757.432 1.19c.27.865.542 1.838 1.353 2.595l.006-.003c.017.019.03.04.048.057l.021-.01l-.02-.584c.648-.974 1.566-1.623 2.864-1.893c.52-.11 1.081-.15 1.663-.128a8.8 8.8 0 0 1 1.798.236c1.46.378 2.595 1.136 2.65 1.785c.027.354.04.695.032 1.036q-.001.096-.007.193l.136.068a.64.64 0 0 0 .206-.19l.003-.003l.006-.008c.04-.054.075-.124.11-.194c.02-.037.038-.086.056-.129c.205-.462.362-1.153.538-1.963c.054-.27.11-.487.163-.703c.433-.973 1.027-1.838 1.622-2.65c.973-1.35 1.892-2.595 1.784-4.055c-1.784-3.461-4.272-4.002-5.57-4.272c-.216-.054-.323-.054-.485-.108c-1.338-.244-2.494-.396-3.605-.365M16.3 14.383a10 10 0 0 0-.032-.983c-.054-.703-1.19-1.46-2.704-1.838a9.5 9.5 0 0 0-1.744-.236a6.8 6.8 0 0 0-1.555.128c-1.244.27-2.216.92-2.811 1.892l.051 1.431c.667-.355 1.733-.874 3.14-1c.065-.005.136-.005.204-.009c.117-.013.266-.044.444-.044c1.607 0 3.268.534 4.877 1.648q.057-.412.07-.823l.045.023c.002-.063.014-.127.015-.19zM11.256.058c.124-.004.254.01.379.011q-.345-.003-.687.016c.103-.006.205-.024.308-.027M10.44.13c-.076.009-.153.013-.229.024c-.817.117-1.774.701-2.75 1.045c.355-.132.714-.296 1.075-.45c.54-.27 1.135-.541 1.621-.595c.094-.014.189-.013.283-.024m-.229.24c.162 0 .379 0 .541.054a1 1 0 0 0-.37-.014a1.2 1.2 0 0 1 .316.068c.58 1-.426 5.279-.679 8.149a57 57 0 0 0 .463 2.72c-.703-1.784-1.406-4.921-1.515-7.354c-.054-.973.001-1.839.218-2.487C9.4.855 9.725.423 10.21.369zm3.136.27c-.81 2.11-.918 6.11-.972 7.354c-.054.54 0 1.73.054 2.595c0 .216.054.432.054.649c0-.217-.054-.379-.054-.595c-.433-3.244-.974-7.136.918-10.002m3.352.379c-.27 2.162-1.405 3.19-1.783 5.3c-.108 1.676-.325 3.622-.379 5.298c-.054-1.676 0-3.46.27-5.245c.27-1.838.865-3.677 1.892-5.353m-10.17.63a.86.86 0 0 1 .6.236l-.014-.007c.133.092.266.209.393.384c-.204.968.255 3.032.04 4.67c.076 1.548.071 3.18.849 4.459c-.98-1.51-1.176-3.437-1.322-5.236c-.113-1.09-.204-2.097-.464-2.903c-.144-.305-.269-.575-.384-.822c-.024-.037-.044-.079-.07-.114a.58.58 0 0 1-.162-.377c0-.054.053-.162.108-.162c.054-.054.161-.056.215-.11a1 1 0 0 1 .21-.018m-1.347.613c-.06.02-.092.041-.14.061c.177-.034.362.034.52.318c-.188.892.436 3.369.428 5.104c.313 1.848.55 3.85 1.572 5.115c-1.19-1.351-1.676-3.73-2.054-5.731c-.325-1.568-.596-2.92-1.136-3.352c-.054-.108-.108-.163-.108-.271c0-.162 0-.379.108-.595c-.277.634-.405 1.267-.37 1.901a3.84 3.84 0 0 1 .37-1.901c0-.054.054-.054.054-.108c.012-.016.031-.035.044-.051a.9.9 0 0 1 .226-.257c.055-.061.096-.12.159-.182c-.053.056-.088.11-.134.165c.027-.018.052-.037.084-.052a.5.5 0 0 1 .377-.164m-.377.164c-.004.007-.008.01-.012.018l.037-.03zm14.76 1.134l-.005.015c.038-.005.075-.017.113-.015c-.037-.002-.076.01-.115.02c-.863 2.642-1.887 5.284-2.911 7.926l-.002.003c-.087.465-.234.884-.54 1.19c.433-.487.486-1.191.54-2.056c.054-.811.054-1.676.487-2.542c0-.053.001-.105.053-.159l.001-.002c.097-.353.202-.689.317-1.018c.418-1.29 1.14-3.166 2.013-3.34c.016-.006.034-.019.05-.022M8.374 16.21l-.324.108c.162.217.27.38.378.433a.8.8 0 0 0 .379.108c.054 0 .161 0 .215-.054l.812-.27c.054 0 .108-.054.162-.054c.108 0 .162 0 .27.054l.271.27l.27-.054c-.108-.162-.27-.323-.378-.377s-.217-.11-.379-.11h-.108l-.866.325h-.161c-.109 0-.216 0-.27-.054s-.163-.162-.271-.325m-2.596.541c-.27.162-.649.433-1.19.649s-.973.433-1.19.649q-.323.324-.323.649c0 .108.054.163.162.217c.054.054.163.054.217.108a28 28 0 0 1 2.216 1.08c.109.054.217.163.272.217c.054.054.107.054.161.054c.109 0 .27-.053.378-.162q.162-.162.163-.325c0-.108-.055-.161-.163-.215c0 0-.433-.217-1.19-.541a12 12 0 0 1-1.188-.595c.162-.27.486-.487.973-.703c.54-.216.92-.433 1.081-.595c.054-.054.054-.108.054-.162a.4.4 0 0 0-.108-.217a.42.42 0 0 0-.27-.108zm11.247 0a.4.4 0 0 0-.216.108c-.054.108-.109.163-.109.217v.054c.162.162.38.27.704.378c.27.054.54.163.811.217q.486.162.649.486v.055c0 .054-.109.162-.325.27c-.108.054-.325.217-.595.433c-.27.162-.433.323-.595.377c-.216.109-.378.217-.432.326c-.054.054-.054.107-.054.161c0 .108.054.108.108.216s.162.11.216.11s.108-.056.162-.056c.27-.162.65-.378 1.082-.757c.486-.378.865-.648 1.082-.81c.216-.108.323-.217.323-.38c0-.053 0-.161-.108-.215c-.378-.433-.918-.702-1.567-.919c-.108-.054-.27-.109-.595-.163c-.162-.054-.325-.108-.433-.108zm-2.974.81c-.27 0-.487.056-.649.218c-.216.162-.27.432-.216.757c0 .27.108.486.27.703s.379.325.595.325c.162 0 .27-.056.433-.11c.27-.162.379-.432.379-.918c0-.379-.109-.649-.271-.81a.9.9 0 0 0-.541-.164zm-4.488.055c-.27 0-.486.055-.648.217c-.217.162-.27.432-.216.757c0 .27.107.486.27.702s.378.326.594.326c.163 0 .271-.056.433-.11c.27-.162.378-.432.378-.918c0-.433-.108-.703-.27-.81a.9.9 0 0 0-.54-.164zm0 .65c.163 0 .271.108.271.27s-.163.27-.27.27c-.163 0-.27-.108-.27-.27s.107-.27.27-.27m4.38.054c.162 0 .271.107.271.27c0 .108-.109.27-.27.27c-.163 0-.27-.108-.27-.27s.107-.27.27-.27m-2.703 2.108l.162.324a1 1 0 0 0 .216.271c.054.054.163.162.27.162h.109c.108 0 .161 0 .215-.054s.164-.054.218-.108l.161-.162c.054-.054.108-.109.108-.163c.054-.054.054-.108.108-.162c0-.054.054-.108.054-.108c-.054.108-.162.216-.216.324c-.108.054-.161.163-.27.163c-.107.054-.216.054-.324.054s-.216 0-.27-.054c-.108 0-.163-.054-.217-.108l-.162-.163c-.054-.054-.108-.162-.162-.216m-.866 1.028c-1.136 0-1.838 1.514-3.46.162c-.432 2.65 2.758 2.866 4.11 1.73c.92-.81.648-1.946-.65-1.892m2.866 0c-1.297-.054-1.568 1.082-.648 1.893c1.351 1.135 4.54.918 4.108-1.731c-1.622 1.352-2.27-.162-3.46-.162"
          />
        </svg>
      ),
      href: "https://www.codechef.com/users/kl_2300031622",
    },
    {
      title: "Hackerank",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="32"
          height="32"
          viewBox="0,0,256,256"
        >
          <g
            fill="#ffffff"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
          >
            <g transform="scale(8,8)">
              <path d="M15.99805,3c-1.773,0 -10.46284,4.98391 -11.33984,6.50391c-0.878,1.521 -0.878,11.47914 0,12.99414c0.881,1.519 9.57084,6.50195 11.33984,6.50195c1.764,0 10.45389,-4.98005 11.33789,-6.49805c0.887,-1.522 0.887,-11.48791 0,-13.00391v-0.00195c-0.891,-1.517 -9.57989,-6.49609 -11.33789,-6.49609zM15.99609,5.01172c1.697,0.353 8.42161,4.20505 9.59961,5.49805c0.54,1.641 0.539,9.33451 0,10.97852c-1.17,1.291 -7.90061,5.148 -9.59961,5.5c-1.698,-0.35 -8.4237,-4.20505 -9.5957,-5.49805c-0.535,-1.648 -0.535,-9.33447 0,-10.98047c1.169,-1.293 7.8967,-5.14805 9.5957,-5.49805zM13,9l-2,2h1v10h2v-4h4v4h-1l2,2l2,-2h-1v-9h-2v3h-4v-4h1z"></path>
            </g>
          </g>
        </svg>
      ),
      href: "https://www.hackerrank.com/profile/kl_2300031622",
    },
    {
      title: "Codolio",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff4f4"
          viewBox="0 0 24 24"
        >
          <path d="M16.5 10A1.5 1.5 0 1 0 16.5 13 1.5 1.5 0 1 0 16.5 10z"></path>
          <path d="M7.5 10A1.5 1.5 0 1 0 7.5 13 1.5 1.5 0 1 0 7.5 10z"></path>
          <path d="m12,13c-.83,0-1.5.62-1.5,2s1.5,3,1.5,3c0,0,1.5-1.62,1.5-3s-.67-2-1.5-2Z"></path>
          <path d="m22,3h-2c0,.77-.11,1.74-.59,2.27-1.85-2.05-4.51-3.27-7.41-3.27s-5.55,1.22-7.41,3.27c-.48-.53-.59-1.51-.59-2.27h-2c0,1.79.48,3.1,1.4,3.89-.27.46-.51.94-.71,1.45,0,0,0,0,0,0-.46,1.16-.69,2.38-.69,3.65,0,.17.02.33.03.5h-.03v9.5h2v-4.03c1.83,2.44,4.73,4.03,8,4.03s6.17-1.59,8-4.03v4.03h2v-9.5h-.03c0-.17.03-.33.03-.5,0-1.27-.23-2.49-.69-3.65,0,0,0,0,0,0-.2-.51-.44-.99-.71-1.45.93-.8,1.4-2.1,1.4-3.89Zm-10,1c1.73,0,3.36.54,4.69,1.5-.03,0-.06,0-.09,0-.03,0-.06,0-.09,0-.13,0-.26.02-.39.02-.05,0-.1,0-.16,0-1.63.16-3.05,1.03-3.95,2.3-.18-.25-.39-.5-.61-.72-1.03-1.04-2.41-1.62-3.89-1.62-.06,0-.12,0-.19,0,1.33-.96,2.95-1.5,4.69-1.5Zm0,16c-4.41,0-8-3.59-8-8,0-.98.17-1.93.52-2.82.04-.06.08-.12.13-.18.04-.06.08-.12.12-.17.05-.06.11-.12.16-.18.05-.05.09-.1.14-.15.06-.06.12-.11.19-.16.05-.04.1-.09.15-.13.07-.05.14-.09.21-.14.05-.04.11-.07.16-.11.07-.04.15-.08.23-.11.06-.03.11-.06.17-.08.08-.03.17-.06.26-.09.04-.01.07-.02.11-.03.2-.03.37-.07.51-.11.15-.02.3-.03.45-.03.94,0,1.82.36,2.48,1.03.66.65,1.02,1.53,1.02,2.47,0,.55.45,1,1,1s1-.45,1-1c0-1.93,1.57-3.5,3.5-3.5.15,0,.3.01.45.03.13.04.31.07.51.11.04.01.07.02.11.03.09.03.17.05.26.09.06.02.11.05.17.08.08.04.16.07.23.11.06.03.11.07.16.11.07.04.14.09.21.14.05.04.1.09.15.13.06.05.13.1.19.16.05.05.09.1.14.15.06.06.11.12.16.18.04.05.08.11.12.17.04.06.09.12.13.18.34.89.52,1.84.52,2.82,0,4.41-3.59,8-8,8Z"></path>
        </svg>
      ),
      href: "https://codolio.com/profile/SambhavSurthi/problemSolving",
    },
    {
      title: "Codeforces",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="#fff4f4"
          id="code-forces"
        >
          <path d="M22.062 21.125h-2.875a1.94 1.94 0 0 1-1.938-1.938V12a1.94 1.94 0 0 1 1.938-1.938h2.875A1.94 1.94 0 0 1 24 12v7.188a1.94 1.94 0 0 1-1.938 1.937zm-2.874-10.063a.939.939 0 0 0-.938.938v7.188c0 .517.42.938.938.938h2.875c.517 0 .938-.42.938-.938V12a.939.939 0 0 0-.938-.938h-2.875zm-5.75 10.063h-2.875a1.94 1.94 0 0 1-1.938-1.938V4.812a1.94 1.94 0 0 1 1.938-1.938h2.875a1.94 1.94 0 0 1 1.938 1.938v14.375a1.941 1.941 0 0 1-1.938 1.938zm-2.876-17.25a.939.939 0 0 0-.938.938v14.375c0 .517.42.938.938.938h2.875c.517 0 .938-.42.938-.938V4.812a.939.939 0 0 0-.938-.938h-2.875zm-5.75 17.25H1.938A1.94 1.94 0 0 1 0 19.188V9.125a1.94 1.94 0 0 1 1.938-1.938h2.875a1.94 1.94 0 0 1 1.938 1.938v10.062a1.941 1.941 0 0 1-1.939 1.938zM1.938 8.188A.938.938 0 0 0 1 9.125v10.062c0 .517.42.938.938.938h2.875c.517 0 .938-.42.938-.938V9.125a.939.939 0 0 0-.938-.938H1.938z"></path>
        </svg>
      ),
      href: "https://codeforces.com/profile/kl_2300031622",
    },
  ];

  // Deduplicate dock items and groups for mobile
  const uniqueDockItems = Array.from(
    new Map(dockItems.map((i) => [`${i.href}|${i.title}`, i])).values()
  );
  const navLinks = uniqueDockItems.filter((i) => i.href?.startsWith("#"));
  const socialLinks = uniqueDockItems.filter((i) => i.href?.startsWith("http"));

  // Resize and recolor dock icons for mobile list
  const renderMobileIcon = (icon: React.ReactNode) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement, {
        className:
          "w-4 h-4 text-neutral-700 transition-colors duration-200 group-hover:text-neutral-900",
      });
    }
    return icon;
  };

  return (
    <footer className="relative w-full bg-white h-full overflow-hidden">
      <div className="hidden md:block">
        {/* Gradient Background */}
        <BgGradient
          gradientFrom="#ffffff"
          gradientTo="#63e"
          gradientSize="125% 125%"
          gradientPosition="50% 10%"
          gradientStop="40%"
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900">
            Let's build something great.
          </h2>
          <p className="mt-3 text-neutral-600 max-w-xl">
            I craft performant, delightful web experiences. Open to
            collaborations, freelance projects, and full-time roles.
          </p>

          {/* <div className="mt-6 flex items-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2 text-sm md:text-base hover:bg-neutral-800 transition-colors"
            >
              Get in touch
            </a>
          </div> */}
        </div>

        {/* Social Links - Only visible on mobile */}
        <div className="block md:hidden px-6 py-6">
          <h3 className="text-xl font-semibold text-neutral-900">
            Social Links
          </h3>
          <div className="mt-4 space-y-6">
            {/* Social */}
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wide text-neutral-500 mb-2">
                Social
              </h4>
              <ul className="grid grid-rows-2 grid-flow-col auto-cols-max gap-x-4 gap-y-2">
                {socialLinks.map((item) => (
                  <li key={`${item.title}-${item.href}`} className="group">
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                      className="relative inline-flex items-center gap-1 text-neutral-800 transition-colors duration-200 hover:text-neutral-900 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-neutral-800 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      <span className="inline-flex">
                        {renderMobileIcon(item.icon)}
                      </span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coding Profiles */}
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wide text-neutral-500 mb-2">
                Navigation
              </h4>
              <ul className="space-y-2">
                {navLinks.map((item) => (
                  <li key={`${item.title}-${item.href}`} className="group">
                    <a
                      href={item.href}
                      className="relative inline-flex items-center gap-1 text-neutral-800 transition-colors duration-200 hover:text-neutral-900 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-neutral-800 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      <span className="inline-flex">
                        {renderMobileIcon(item.icon)}
                      </span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Dock Section - Only visible on desktop */}
        <div className="hidden md:block py-8">
          <div className="flex justify-center">
            <Dock className="items-end pb-3">
              {dockItems.map((item, idx) => (
                <DockItem
                  key={idx}
                  className="aspect-square rounded-full  bg-neutral-800 dark:bg-gray-200 hover:bg-neutral-700 dark:hover:bg-gray-300 transition-colors"
                >
                  <DockLabel>{item.title}</DockLabel>
                  <DockIcon>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                    >
                      {item.icon}
                    </a>
                  </DockIcon>
                </DockItem>
              ))}
            </Dock>
          </div>
        </div>

        {/* Dividing Line */}
        <div className="border-t border-gray-200 dark:border-gray-700 mx-6"></div>

        {/* Bottom Bar */}
        <div className="px-6 py-4 flex justify-between md:flex-row md:items-center md:justify-between text-black gap-2">
          {/* Left - Copyright and tagline (stacked on mobile) */}
          <div className="flex flex-col">
            <div className="text-sm md:text-lg">
              <span>© 2025 </span>
              <span className="font-semibold uppercase tracking-wide">
                Sambhav Surthi
              </span>
            </div>
            <div className="text-xs md:text-sm text-neutral-500 md:text-zinc-800">
              Designed and coded with <span className="text-red-500">❤️</span>
            </div>
          </div>

          {/* Right - Scroll to top (right-aligned on mobile) */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs md:text-base font-semibold uppercase tracking-widest">
              Back To Top
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
