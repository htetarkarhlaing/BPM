import './globals.css'
import Layout from '@src/layout/client'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head />
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
