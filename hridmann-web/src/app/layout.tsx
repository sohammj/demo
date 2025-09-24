// src/app/layout.tsx
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import React from "react";
import Script from "next/script";

import ClickSparkWrapper from "@/components/ClickSparkWrapper"; // or "../components/ClickSparkWrapper" if no alias

export const metadata: Metadata = {
  title: "Hridmann",
  description:
    "Psychology-led training, assessments, and counselling by Harshana Uchil Kuveskar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (


    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        {/* Google Fonts (Playfair Display + Poppins) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Bootstrap */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="app-root">
          <ClickSparkWrapper>{children}</ClickSparkWrapper>
        </div>
      </body>
    </html>
  );
}



// // layout.tsx
// import './globals.css'
// import type { Metadata } from 'next'
// import Script from 'next/script'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-icons/font/bootstrap-icons.css'




// import ClickSparkWrapper from "../components/ClickSparkWrapper";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <ClickSparkWrapper>{children}</ClickSparkWrapper>
//       </body>
//     </html>
//   );
// }


// export const metadata: Metadata = {
//   title: 'Hridmann – Psychology • Training • Assessments',
//   description: 'Psychology-led training, assessments, and counselling by Harshana Uchil Kuveskar.',
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
    // <html lang="en" suppressHydrationWarning>
    //   <head>
    //     {/* Google Fonts (Playfair Display + Poppins) */}
    //     <link rel="preconnect" href="https://fonts.googleapis.com" />
    //     <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    //     <link
    //       href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@300;400;500;600&display=swap"
    //       rel="stylesheet"
    //     />
    //     {/* Bootstrap */}
    //     <link
    //       href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    //       rel="stylesheet"
    //     />
    //     <link
    //       href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
    //       rel="stylesheet"
    //     />
    //   </head>
    //   <body>
    //     {/* Only add sparks after splash has gone */}
    //     <ClickSparkWrapper>{children}</ClickSparkWrapper>

    //     {/* Bootstrap JS */}
    //     <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" />
    //   </body>
    // </html>
//   )
// }
