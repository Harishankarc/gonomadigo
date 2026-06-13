import PackagesDetails from "@/components/Packages_Details";

export default async function PackageDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PackagesDetails id={id} />;
}
