import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Admission form uploads ID proof, photo and marksheet (max 5 MB each).
    serverActions: { bodySizeLimit: '16mb' },
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
