/** @type {import('next').NextConfig} */
const nextConfig = {
  // Undgå at bundle pdfkit – den læser font-filer (.afm) via __dirname/data/
  // som ikke findes i serverless-bundlet. Lad Node loade fra node_modules i stedet.
  experimental: {
    serverComponentsExternalPackages: ["pdfkit"],
  },
};

export default nextConfig;
