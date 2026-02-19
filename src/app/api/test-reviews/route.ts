import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

/**
 * POST /api/test-reviews
 * Indsætter test-reviews i databasen ved hjælp af service role (bypass RLS).
 * KUN TIL TEST - fjern eller beskytt denne endpoint i produktion!
 * 
 * BEMÆRK: Denne endpoint kræver SUPABASE_SERVICE_ROLE_KEY i .env.local
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServiceRoleClient();
    
    // Først: Find en eksisterende bruger (eller opret en test-bruger)
    const { data: users } = await supabase.auth.admin.listUsers();
    if (!users || users.users.length === 0) {
      return NextResponse.json(
        { error: "Ingen brugere fundet. Opret en test-bruger først via signup/login." },
        { status: 400 }
      );
    }
    
    // Brug den første bruger (eller du kan vælge en specifik)
    const testUserId = users.users[0].id;
    
    // Test-reviews med forskellige ratings og kommentarer
    const testReviews = [
      {
        user_id: testUserId,
        pattern_slug: "hygge-sweater",
        rating: 5,
        comment: "Fantastisk opskrift! Jeg har strikket den tre gange nu. Meget tydelig vejledning og perfekt pasform.",
      },
      {
        user_id: testUserId,
        pattern_slug: "hygge-sweater",
        rating: 4,
        comment: "God opskrift, men jeg synes ærmerne blev lidt lange. Ellers super god kvalitet.",
      },
      {
        user_id: testUserId,
        pattern_slug: "havbrise-cardigan",
        rating: 5,
        comment: "Min favorit! Let og luftig, perfekt til forår og sommer. Anbefaler stærkt.",
      },
      {
        user_id: testUserId,
        pattern_slug: "havbrise-cardigan",
        rating: 5,
        comment: "Så flot! Har fået så mange komplimenter. Opskriften er let at følge selv for begyndere.",
      },
      {
        user_id: testUserId,
        pattern_slug: "lun-hue",
        rating: 4,
        comment: "Hurtig og nem opskrift. Perfekt til at bruge restgarn. Min datter elsker den!",
      },
      {
        user_id: testUserId,
        pattern_slug: "vinter-sweater",
        rating: 5,
        comment: "Varm og behagelig sweater. Har strikket den i uld og den holder rigtig godt.",
      },
      {
        user_id: testUserId,
        pattern_slug: "sommer-cardigan",
        rating: 4,
        comment: "Flot design og god pasform. Lidt mere avanceret end jeg troede, men resultatet var det værd.",
      },
    ];

    const { data, error } = await supabase
      .from("reviews")
      .upsert(testReviews, {
        onConflict: "user_id,pattern_slug",
      })
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message, details: "Tjek om SUPABASE_SERVICE_ROLE_KEY er sat i .env.local" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      inserted: data?.length || 0,
      message: `${data?.length || 0} test-reviews indsat succesfuldt!`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Ukendt fejl", details: "Tjek om SUPABASE_SERVICE_ROLE_KEY er sat i .env.local" },
      { status: 500 }
    );
  }
}
