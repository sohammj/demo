// // // src/app/api/revalidate/route.ts
// // import { NextRequest, NextResponse } from 'next/server'

// // export async function GET(req: NextRequest) {
// //   const secret = req.nextUrl.searchParams.get('secret')
// //   if (secret !== process.env.REVALIDATE_SECRET) {
// //     return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
// //   }

// //   const path = req.nextUrl.searchParams.get('path') || '/'

// //   try {
// //     const { revalidatePath } = await import('next/cache')
// //     revalidatePath(path) // App Router ISR revalidation
// //     return NextResponse.json({ ok: true, path })
// //   } catch (e: any) {
// //     return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
// //   }
// // }




// // app/api/revalidate/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { revalidatePath } from 'next/cache'

// export async function GET(req: NextRequest) {
//   const secret = req.nextUrl.searchParams.get('secret')
//   if (secret !== process.env.REVALIDATE_SECRET) {
//     return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
//   }

//   const path = req.nextUrl.searchParams.get('path') || '/'

//   try {
//     revalidatePath(path)
//     return NextResponse.json({ ok: true, path })
//   } catch (e: unknown) {
//     const error = e instanceof Error ? e.message : String(e)
//     return NextResponse.json({ ok: false, error }, { status: 500 })
//   }
// }




// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const path = req.nextUrl.searchParams.get('path') || '/'

  try {
    revalidatePath(path)
    return NextResponse.json({ ok: true, path })
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ ok: false, error }, { status: 500 })
  }
}
