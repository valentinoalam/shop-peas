export async function GET() {
    const session = await getSession()
    if (!session) return NextResponse.json([])
  
    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id, isDeleted: false }
    })
  
    return NextResponse.json(addresses)
  }