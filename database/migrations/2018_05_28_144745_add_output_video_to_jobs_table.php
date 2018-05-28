<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOutputVideoToJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->string('video_filename')->after('user_id');
            $table->string('status')->after('user_id');
            $table->string('output_video_path')->nullable()->after('video_path');            
            $table->timestamp('queued_at')->nullable()->after('updated_at');
            $table->timestamp('started_at')->nullable()->after('queued_at');
            $table->timestamp('ended_at')->nullable()->after('started_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn('video_filename');
            $table->dropColumn('status');
            $table->dropColumn('output_video_path');
            $table->dropColumn('queued_at');
            $table->dropColumn('started_at');
            $table->dropColumn('ended_at');
        });
    }
}
