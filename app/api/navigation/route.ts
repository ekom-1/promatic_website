import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET - Fetch all navigation items
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const menuType = searchParams.get('menu_type');

    let query = supabase
      .from('navigation_items')
      .select('*')
      .order('order_index', { ascending: true });

    if (menuType) {
      query = query.eq('menu_type', menuType);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch navigation items' }, { status: 500 });
  }
}

// POST - Create new navigation item
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const body = await request.json();
    const { label, href, menu_type, order_index, parent_id } = body;

    if (!label || !href || !menu_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('navigation_items')
      .insert([{ label, href, menu_type, order_index: order_index || 0, parent_id }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create navigation item' }, { status: 500 });
  }
}

// PUT - Update navigation item
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient();
    const body = await request.json();
    const { id, label, href, order_index, parent_id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    const updateData: any = {};
    if (label !== undefined) updateData.label = label;
    if (href !== undefined) updateData.href = href;
    if (order_index !== undefined) updateData.order_index = order_index;
    if (parent_id !== undefined) updateData.parent_id = parent_id;

    const { data, error } = await supabase
      .from('navigation_items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update navigation item' }, { status: 500 });
  }
}

// DELETE - Delete navigation item
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('navigation_items')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete navigation item' }, { status: 500 });
  }
}
