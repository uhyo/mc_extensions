// canvas正男加速床拡張
CanvasMasao.AccelBlock = (function(){
    var AccelBlock = function(mc){
        this.mc = mc;
        mc.mp.jM100 = accel_jM100.bind(mc.mp, this)
        
        // 速さ設定
        this.NORMAL_RUN_SPEED = 120;
        this.FAST_RUN_SPEED = 200;
        this.FAST_RUN_TIME = 6;    //加速するフレーム数
        // このブロックに乗ると加速
        this.FAST_BLOCK_NUM = 28;
        
        this.run_max_speed = this.NORMAL_RUN_SPEED;
        this.high_speed_frame = 0;
    };
    AccelBlock.prototype.frame = function(){
        var mp = this.mc.mp;
        if (mp.isRideGround()){
            // 地面に乗っている
            var x = ((mp.co_j.x + 15) >> 5) - 1;
            var y = ((mp.co_j.y + 15) >> 5) - 10;
            var block = mp.getmapc(x, y+1);
            if (block === this.FAST_BLOCK_NUM){
                this.high_speed_frame = this.FAST_RUN_TIME;
            }
        }
        if (this.high_speed_frame-- <= 0){
            this.high_speed_frame = 0;
            this.run_max_speed = this.NORMAL_RUN_SPEED;
        }else{
            this.run_max_speed = this.FAST_RUN_SPEED;
        }
    }

    AccelBlock.inject = function(mc, options){
        var _ui=mc.userInit, _us=mc.userSub;
        mc.userInit = function(){
            _ui.apply(mc);
            this.accelBlock = new CanvasMasao.AccelBlock(this);
        };
        mc.userSub = function(g,image){
            _us.call(mc,g,image);
            this.accelBlock.frame();
        };
    };

    return AccelBlock;

    // jM100のほぼコピペ
    function accel_jM100(ab)
{
	var flag1 = false;
	var flag2 = false;
	var flag19 = false;
	var flag21 = false;
	this.j_mizu_f = false;
	var l29 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
	if(l29 == 4)
	{
		this.j_mizu_f = true;
		this.j_djump_kf = true;
		this.j_jet_c = 0;
		this.j_mizu_awa_c++;
		if(this.j_mizu_awa_c == 44 || this.j_mizu_awa_c == 54)
			this.mSet(this.co_j.x, this.co_j.y + 4, 60);
		else
		if(this.j_mizu_awa_c > 54)
			this.j_mizu_awa_c = 0;
	} else
	if(l29 == 8 || l29 == 9)
	{
		if(this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][(this.co_j.y + 15) >> 5] == 4)
		{
			this.j_mizu_f = true;
			this.j_djump_kf = true;
			this.j_jet_c = 0;
			this.j_mizu_awa_c++;
			if(this.j_mizu_awa_c == 44 || this.j_mizu_awa_c == 54)
				this.mSet(this.co_j.x, this.co_j.y + 4, 60);
			else
			if(this.j_mizu_awa_c > 54)
				this.j_mizu_awa_c = 0;
		}
	} else
	if(l29 >= 15 && l29 <= 19 && this.maps.map_bg[(this.co_j.x + 15) >> 5][((this.co_j.y + 15) >> 5) - 1] == 4)
	{
		this.j_mizu_f = true;
		this.j_djump_kf = true;
		this.j_jet_c = 0;
		this.j_mizu_awa_c++;
		if(this.j_mizu_awa_c == 44 || this.j_mizu_awa_c == 54)
			this.mSet(this.co_j.x, this.co_j.y + 4, 60);
		else
		if(this.j_mizu_awa_c > 54)
			this.j_mizu_awa_c = 0;
	}
	if(this.jst_auto_right > 0)
		if(this.jst_auto_right == 1)
		{
			this.gk.right_f = true;
			this.gk.left_f = false;
			this.j_hashiru_f = false;
		} else
		if(this.jst_auto_right == 2)
		{
			this.gk.right_f = true;
			this.gk.left_f = false;
			this.j_hashiru_f = true;
		}
	if(this.gk.tr1_f)
	{
		if(this.tr1_c < 6)
			this.tr1_c++;
	} else
	{
		this.tr1_c = 0;
	}
	if(this.gk.tr1_f)
	{
		if(this.gk.tr1_c < 6)
			this.gk.tr1_c++;
	} else
	{
		this.gk.tr1_c = 0;
	}
	if(this.gk.tr2_f)
	{
		if(this.tr2_c < 2)
			this.tr2_c++;
	} else
	{
		this.tr2_c = 0;
	}
	if(this.gk.left_f)
	{
		if(this.gk.left_c < 2)
			this.gk.left_c++;
	} else
	{
		this.gk.left_c = 0;
	}
	if(this.gk.right_f)
	{
		if(this.gk.right_c < 2)
			this.gk.right_c++;
	} else
	{
		this.gk.right_c = 0;
	}
	if(this.gk.left_c == 1)
	{
		if(this.left_dcc > 0 && this.jst_fast_run != 2)
			this.j_hashiru_f = true;
		else
			this.j_hashiru_f = false;
		this.left_dcc = 8;
	} else
	if(this.left_dcc > 0)
		this.left_dcc--;
	if(this.gk.right_c == 1)
	{
		if(this.right_dcc > 0 && this.jst_fast_run != 2)
			this.j_hashiru_f = true;
		else
			this.j_hashiru_f = false;
		this.right_dcc = 8;
	} else
	if(this.right_dcc > 0)
		this.right_dcc--;
	if(this.gk.up_f)
	{
		this.up_key_c++;
		if(this.up_key_c > 2)
			this.up_key_c = 2;
	} else
	{
		this.up_key_c = 0;
	}
	if(this.gk.down_f)
	{
		this.down_key_c++;
		if(this.down_key_c > 2)
			this.down_key_c = 2;
	} else
	{
		this.down_key_c = 0;
	}
	var j5 = this.co_j.x;
	var k5 = this.co_j.y;
	this.co_j.pt = 100;
	var i = (j5 + 15) >> 5;
	var j2 = (k5 + 31) >> 5;
	var word0 = this.maps.map_bg[i][j2];
	var flag = this.map_data_option[i][j2];
	var l2 = (k5 + 32) >> 5;
	var word2 = this.maps.map_bg[i][l2];
	if(this.j_shitakara_mushi_y > 0 && this.j_shitakara_mushi_y != l2)
		this.j_shitakara_mushi_y = -1;
	flag19 = false;
	if(word2 == 15 && (k5 >> 5) * 32 == k5 && this.co_j.vy >= 0)
	{
		flag19 = true;
		if(this.j_shitakara_mushi_y > 0 && this.j_shitakara_mushi_y == l2)
			flag19 = false;
	}
	if((word2 >= 20 || word2 == 10 || this.j_a_id >= 0 || flag19) && this.j_hashigo_mushi_x != (this.co_j.x + 15) >> 5)
	{
		this.co_j.jimen_f = true;
		this.j_jump_type = 2;
		if(word2 == 69)
			flag2 = true;
	} else
	{
		this.co_j.jimen_f = false;
	}
	if(this.yuka_ride_id >= 0)
	{
		this.co_j.jimen_f = true;
		this.j_jump_type = 2;
	}
	if(word0 == 18 || word0 == 19)
	{
		var j21 = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
		if(this.map_data_option[i][j2])
		{
			if((this.saka_mushi_y <= 0 || this.saka_mushi_y != j2) && j21 == this.co_j.y && this.co_j.vy >= 0)
			{
				this.co_j.jimen_f = true;
				this.j_jump_type = 2;
			}
		} else
		if(j21 <= this.co_j.y)
		{
			this.co_j.y = j21;
			if(this.co_j.vy >= 0)
			{
				this.co_j.jimen_f = true;
				this.j_jump_type = 2;
			}
		}
	}
	if(word0 == 10 && (this.co_j.y >> 5) * 32 == this.co_j.y)
	{
		this.co_j.jimen_f = true;
		if(this.j_tokugi <= 11 && (this.co_j.x + 15) >> 5 != this.j_hashigo_mushi_x && this.maps.getBGCode((this.co_j.x + 15) - 32, this.co_j.y + 31) != 10 && this.maps.getBGCode(this.co_j.x + 15 + 32, this.co_j.y + 31) != 10 && this.maps.getBGCode((this.co_j.x + 15) - 32, this.co_j.y + 32) <= 9 && this.maps.getBGCode(this.co_j.x + 15 + 32, this.co_j.y + 32) <= 9)
		{
			var flag5 = false;
			if((this.co_j.x >> 5) * 32 != this.co_j.x)
			{
				var j10 = 0;
				do
				{
					if(j10 > this.a_kazu)
						break;
					if(this.co_a[j10].c == 410 && this.co_a[j10].x <= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_a[j10].x + 95 >= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_j.y + 31 >= this.co_a[j10].y && this.co_j.y <= this.co_a[j10].y + 63)
					{
						flag5 = true;
						break;
					}
					j10++;
				} while(true);
			}
			if(!flag5)
			{
				this.j_hashigo_f = true;
				this.co_j.x = ((this.co_j.x + 15) >> 5) * 32;
			}
		}
	}
	if(this.j_hashigo_mushi_x != (this.co_j.x + 15) >> 5 || this.co_j.vx == 0)
		this.j_hashigo_mushi_x = -1;
	if(this.saka_mushi_y >= 0)
		if(this.co_j.y + 31 > this.saka_mushi_y * 32 + 32 + 23 || this.co_j.y + 31 < this.saka_mushi_y * 32)
			this.saka_mushi_y = -1;
		else
		if(this.co_j.jimen_f || this.j_hashigo_f)
			this.saka_mushi_y = -1;
	if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10 || this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10)
	{
		if(this.j_hashigo_mushi_x != (this.co_j.x + 15) >> 5)
			this.j_jump_type = 2;
		if(this.gk.up_f)
		{
			var flag6 = false;
			if((this.co_j.x >> 5) * 32 != this.co_j.x)
			{
				var k10 = 0;
				do
				{
					if(k10 > this.a_kazu)
						break;
					if(this.co_a[k10].c == 410 && this.co_a[k10].x <= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_a[k10].x + 95 >= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_j.y + 31 >= this.co_a[k10].y && this.co_j.y <= this.co_a[k10].y + 63)
					{
						flag6 = true;
						break;
					}
					k10++;
				} while(true);
			}
			if(!flag6)
			{
				this.j_hashigo_f = true;
				this.co_j.jimen_f = false;
				this.j_jet_c = 0;
				this.co_j.direction = 2;
			}
		}
		if(this.gk.down_f && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) < 20 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) != 15)
		{
			var flag7 = false;
			if((this.co_j.x >> 5) * 32 != this.co_j.x)
			{
				var l10 = 0;
				do
				{
					if(l10 > this.a_kazu)
						break;
					if(this.co_a[l10].c == 410 && this.co_a[l10].x <= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_a[l10].x + 95 >= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_j.y + 31 >= this.co_a[l10].y && this.co_j.y <= this.co_a[l10].y + 63)
					{
						flag7 = true;
						break;
					}
					l10++;
				} while(true);
			}
			if(!flag7)
			{
				this.j_hashigo_f = true;
				this.co_j.jimen_f = false;
				this.j_jet_c = 0;
				this.co_j.direction = 3;
			}
		}
		if(!this.co_j.jimen_f && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) < 20 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) != 15)
		{
			this.co_j.jimen_f = false;
			this.j_jet_c = 0;
		}
	} else
	{
		this.j_hashigo_f = false;
		this.co_j.direction = 0;
	}
	if(this.j_hashigo_f)
	{
		if(this.gk.left_f)
		{
			var j16 = (this.co_j.y + 15) >> 5;
			var word20 = this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][j16];
			var word30 = this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][j16 + 1];
			if((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && (word20 <= 10 || word20 == 15))
			{
				this.j_hashigo_f = false;
				this.co_j.jimen_f = true;
				this.co_j.y = j16 * 32;
				this.j_shitakara_mushi_y = -1;
				this.co_j.direction = 0;
			} else
			if(word20 == 10)
			{
				this.j_hashigo_f = false;
				this.co_j.jimen_f = true;
				this.co_j.y = j16 * 32;
				this.j_shitakara_mushi_y = -1;
				this.co_j.direction = 0;
			} else
			if((word20 <= 10 || word20 == 15) && (word30 >= 20 || word30 == 15 || word30 == 10))
			{
				var word21 = this.maps.map_bg[(this.co_j.x + 15) >> 5][j16 + 1];
				if(word21 == 10 || word21 == 15 || word21 >= 20)
				{
					this.j_hashigo_f = false;
					this.co_j.jimen_f = true;
					this.co_j.y = j16 * 32;
					this.j_shitakara_mushi_y = -1;
					this.co_j.direction = 0;
				}
			}
		}
		if(this.gk.right_f)
		{
			var k16 = (this.co_j.y + 15) >> 5;
			var word22 = this.maps.map_bg[((this.co_j.x + 15) >> 5) + 1][k16];
			var word31 = this.maps.map_bg[((this.co_j.x + 15) >> 5) + 1][k16 + 1];
			if((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && (word22 <= 10 || word22 == 15))
			{
				this.j_hashigo_f = false;
				this.co_j.jimen_f = true;
				this.co_j.y = k16 * 32;
				this.j_shitakara_mushi_y = -1;
				this.co_j.direction = 0;
			}
			if(word22 == 10)
			{
				this.j_hashigo_f = false;
				this.co_j.jimen_f = true;
				this.co_j.y = k16 * 32;
				this.j_shitakara_mushi_y = -1;
				this.co_j.direction = 0;
			} else
			if((word22 <= 10 || word22 == 15) && (word31 >= 20 || word31 == 15 || word31 == 10))
			{
				var word23 = this.maps.map_bg[(this.co_j.x + 15) >> 5][k16 + 1];
				if(word23 == 10 || word23 == 15 || word23 >= 20)
				{
					this.j_hashigo_f = false;
					this.co_j.jimen_f = true;
					this.co_j.y = k16 * 32;
					this.j_shitakara_mushi_y = -1;
					this.co_j.direction = 0;
				}
			}
		}
	}
	if(this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
	{
		if(this.ana_kazu > 0)
		{
			var l5 = 0;
			do
			{
				if(l5 > this.t_kazu)
					break;
				if((this.co_t[l5].c == 1250 || this.co_t[l5].c == 1310) && this.co_j.x + 15 >= this.co_t[l5].x && this.co_j.x + 15 <= this.co_t[l5].x + 31 && this.co_j.y == this.co_t[l5].y - 32)
				{
					this.co_j.jimen_f = true;
					break;
				}
				l5++;
			} while(true);
		}
		var i6 = 0;
		do
		{
			if(i6 > this.t_kazu)
				break;
			if(this.co_t[i6].c >= 1200 && this.co_t[i6].c <= 1220 && Math.abs(this.co_j.x - this.co_t[i6].x) <= 24 && this.co_j.y == this.co_t[i6].y - 32)
			{
				this.co_j.y = this.co_t[i6].y - 32;
				this.co_j.jimen_f = true;
				break;
			}
			i6++;
		} while(true);
	}
	if(this.j_hashigo_f)
		this.co_j.jimen_f = false;
	if(this.j_cannon_c > 0)
	{
		this.j_cannon_c--;
		if(this.co_j.jimen_f || this.j_hashigo_f || this.j_cannon_c == 0)
			if(this.jst_pc_attack >= 1 && this.j_cannon_c > 0 && (this.j_cannon_type == 3 || this.j_cannon_type == 4))
			{
				if(this.j_hashigo_f)
				{
					this.j_cannon_c = 0;
					if(this.co_j.vx < -120)
						this.co_j.vx = -120;
					if(this.co_j.vx > 120)
						this.co_j.vx = 120;
				}
			} else
			{
				this.j_cannon_c = 0;
				if(this.co_j.vx < -120)
					this.co_j.vx = -120;
				if(this.co_j.vx > 120)
					this.co_j.vx = 120;
				if(this.j_cannon_type == 3 || this.j_cannon_type == 4)
				{
					this.co_j.vx = 0;
					this.co_j.vy = 20;
					this.j_jump_type = 0;
				}
			}
	}
	if(this.j_hashigo_f)
	{
		this.j_djump_kf = true;
		if(this.gk.left_f)
			this.co_j.muki = 0;
		else
		if(this.gk.right_f)
			this.co_j.muki = 1;
		if(this.gk.up_f && !this.gk.left_f && !this.gk.right_f)
		{
			this.co_j.vy = -80;
			this.co_j.ac++;
			if(this.co_j.ac > 3)
				this.co_j.ac = 0;
		} else
		if(this.gk.down_f && !this.gk.left_f && !this.gk.right_f)
		{
			this.co_j.vy = 80;
			this.co_j.ac++;
			if(this.co_j.ac > 3)
				this.co_j.ac = 0;
		} else
		{
			this.co_j.vy = 0;
			this.co_j.ac = 0;
		}
		this.co_j.vx = 0;
	} else
	if(this.gk.down_f && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) == 10 && !this.gk.left_f && !this.gk.right_f)
	{
		var flag8 = false;
		var i11 = 0;
		do
		{
			if(i11 > this.a_kazu)
				break;
			if(this.co_a[i11].c == 410 && this.co_a[i11].x <= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_a[i11].x + 95 >= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_j.y + 31 >= this.co_a[i11].y && this.co_j.y <= this.co_a[i11].y + 63)
			{
				flag8 = true;
				break;
			}
			i11++;
		} while(true);
		if(!flag8)
		{
			this.j_djump_kf = true;
			this.co_j.vy = 80;
			this.co_j.vx = 0;
			this.co_j.jimen_f = false;
			this.j_hashigo_f = true;
		}
	} else
	if(this.co_j.jimen_f)
	{
		this.j_djump_kf = true;
		this.j_zan_f = false;
		this.j_jet_c = 0;
		if(this.gk.left_f && (this.j_cannon_c <= 0 || this.j_cannon_type != 3 && this.j_cannon_type != 4))
		{
			if(flag2)
			{
				this.co_j.vx -= 4;
				if(this.gk.left_c == 1 && this.co_j.vx > 30)
					this.gs.rsAddSound(5);
			} else
			{
				this.co_j.vx -= 15;
				if(this.gk.left_c == 1 && this.co_j.vx > 60)
					this.gs.rsAddSound(5);
			}
			if(this.j_hashiru_f)
			{
				if(!this.j_mizu_f)
				{
					if(this.jst_fast_run == 1)
					{
						if(this.co_j.vx < -180)
							this.co_j.vx = -180;
					} else
					if(this.co_j.vx < -ab.run_max_speed)
						this.co_j.vx = -ab.run_max_speed;
				} else
				if(this.co_j.vx < -60)
					this.co_j.vx = -60;
				if(this.co_j.vx > 0 && !flag2)
				{
					this.co_j.pt = 108;
					this.co_j.ac = 0;
				} else
				{
					this.co_j.pt = 105 + (this.co_j.ac >> 1);
					this.co_j.ac++;
					if(this.co_j.ac > 3)
						this.co_j.ac = 0;
				}
			} else
			{
				if(!this.j_mizu_f)
				{
					if(this.co_j.vx < -60)
						this.co_j.vx = -60;
				} else
				if(this.co_j.vx < -40)
					this.co_j.vx = -40;
				if(this.co_j.vx > 0 && !flag2)
				{
					this.co_j.pt = 108;
					this.co_j.ac = 0;
				} else
				{
					this.co_j.pt = 103 + (this.co_j.ac >> 1);
					this.co_j.ac++;
					if(this.co_j.ac > 3)
						this.co_j.ac = 0;
				}
			}
			this.co_j.muki = 0;
		} else
		if(this.gk.right_f && (this.j_cannon_c <= 0 || this.j_cannon_type != 3 && this.j_cannon_type != 4))
		{
			if(flag2)
			{
				this.co_j.vx += 4;
				if(this.gk.right_c == 1 && this.co_j.vx < -30)
					this.gs.rsAddSound(5);
			} else
			{
				this.co_j.vx += 15;
				if(this.gk.right_c == 1 && this.co_j.vx < -60)
					this.gs.rsAddSound(5);
			}
			if(this.j_hashiru_f)
			{
				if(!this.j_mizu_f)
				{
					if(this.jst_fast_run == 1)
					{
						if(this.co_j.vx > 180)
							this.co_j.vx = 180;
					} else
					if(this.co_j.vx > ab.run_max_speed)
						this.co_j.vx = ab.run_max_speed;
				} else
				if(this.co_j.vx > 60)
					this.co_j.vx = 60;
				if(this.co_j.vx < 0 && !flag2)
				{
					this.co_j.pt = 108;
					this.co_j.ac = 0;
				} else
				{
					this.co_j.pt = 105 + (this.co_j.ac >> 1);
					this.co_j.ac++;
					if(this.co_j.ac > 3)
						this.co_j.ac = 0;
				}
			} else
			{
				if(!this.j_mizu_f)
				{
					if(this.co_j.vx > 60)
						this.co_j.vx = 60;
				} else
				if(this.co_j.vx > 40)
					this.co_j.vx = 40;
				if(this.co_j.vx < 0 && !flag2)
				{
					this.co_j.pt = 108;
					this.co_j.ac = 0;
				} else
				{
					this.co_j.pt = 103 + (this.co_j.ac >> 1);
					this.co_j.ac++;
					if(this.co_j.ac > 3)
						this.co_j.ac = 0;
				}
			}
			this.co_j.muki = 1;
		} else
		if(this.co_j.vx < 0)
		{
			if(this.j_cannon_c <= 0 || this.j_cannon_type != 3 && this.j_cannon_type != 4)
				if(flag2)
					this.co_j.vx++;
				else
					this.co_j.vx += 5;
			if(this.co_j.vx > 0)
				this.co_j.vx = 0;
			if(this.j_hashiru_f || flag2)
			{
				this.co_j.pt = 107;
				this.co_j.ac = 0;
			} else
			{
				this.co_j.pt = 103 + (this.co_j.ac >> 1);
				this.co_j.ac++;
				if(this.co_j.ac > 3)
					this.co_j.ac = 0;
			}
			this.co_j.muki = 0;
		} else
		if(this.co_j.vx > 0)
		{
			if(this.j_cannon_c <= 0 || this.j_cannon_type != 3 && this.j_cannon_type != 4)
				if(flag2)
					this.co_j.vx--;
				else
					this.co_j.vx -= 5;
			if(this.co_j.vx < 0)
				this.co_j.vx = 0;
			if(this.j_hashiru_f || flag2)
			{
				this.co_j.pt = 107;
				this.co_j.ac = 0;
			} else
			{
				this.co_j.pt = 103 + (this.co_j.ac >> 1);
				this.co_j.ac++;
				if(this.co_j.ac > 3)
					this.co_j.ac = 0;
			}
			this.co_j.muki = 1;
		} else
		{
			this.co_j.ac = 0;
		}
	} else
	{
		if((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && !this.j_mizu_f)
		{
			if(this.co_j.vy < 0)
			{
				if(this.co_j.vx < 0)
					this.co_j.vx = -30;
				if(this.co_j.vx > 0)
					this.co_j.vx = 30;
			} else
			{
				if(this.co_j.vx < 0)
					this.co_j.vx = -60;
				if(this.co_j.vx > 0)
					this.co_j.vx = 60;
			}
			if(this.co_j.vy < 0)
			{
				if(Math.abs((this.co_j.x >> 5) * 32 - this.co_j.x) < 3)
				{
					this.co_j.x = ((this.co_j.x + 15) >> 5) * 32;
					this.co_j.vx = 0;
				}
			} else
			if(Math.abs((this.co_j.x >> 5) * 32 - this.co_j.x) < 6)
			{
				this.co_j.x = ((this.co_j.x + 15) >> 5) * 32;
				this.co_j.vx = 0;
			}
			if(this.co_j.vy > 90)
				this.co_j.vy = 90;
		} else
		if(this.gk.left_f)
		{
			if(this.j_cannon_c <= 0 && !this.j_mizu_f)
				if(this.jst_fly_left_right == 1)
				{
					this.co_j.vx -= 15;
					if(this.co_j.vx < -120)
						this.co_j.vx = -120;
				} else
				if(this.co_j.vx > -60)
				{
					this.co_j.vx -= 10;
					if(this.co_j.vx < -60)
						this.co_j.vx = -60;
				}
		} else
		if(this.gk.right_f && this.j_cannon_c <= 0 && !this.j_mizu_f)
			if(this.jst_fly_left_right == 1)
			{
				this.co_j.vx += 15;
				if(this.co_j.vx > 120)
					this.co_j.vx = 120;
			} else
			if(this.co_j.vx < 60)
			{
				this.co_j.vx += 10;
				if(this.co_j.vx > 60)
					this.co_j.vx = 60;
			}
		if((this.jst_kabe_kick == 1 || this.jst_kabe_kick == 2) && this.gk.tr1_c == 1 && !this.j_mizu_f)
		{
			var l19 = this.maps.getBGCode(this.co_j.x + 14, this.co_j.y);
			var k20 = this.maps.getBGCode(this.co_j.x + 14, this.co_j.y + 31);
			if(l19 >= 20 || l19 == 18 || k20 >= 20 || k20 == 18)
			{
				if(this.jst_kabe_kick == 2)
				{
					this.co_j.vx = 60;
					this.co_j.vy = -260;
					this.co_j.muki = 1;
					this.j_jump_level = 3;
					this.j_jump_type = 0;
					this.gs.rsAddSound(3);
				} else
				{
					this.co_j.vx = 60;
					if(!this.j_mizu_f)
						this.co_j.vx = 120;
					this.j_jump_type = 5;
					this.co_j.muki = 0;
					if(this.co_j.vy > 0)
						this.co_j.vy = -25;
					else
						this.co_j.vy -= 50;
				}
				flag21 = true;
				this.j_djump_kf = true;
			}
			l19 = this.maps.getBGCode(this.co_j.x + 16, this.co_j.y);
			k20 = this.maps.getBGCode(this.co_j.x + 16, this.co_j.y + 31);
			if(l19 >= 19 || k20 >= 19)
			{
				if(this.jst_kabe_kick == 2)
				{
					this.co_j.vx = -60;
					this.co_j.vy = -260;
					this.co_j.muki = 0;
					this.j_jump_level = 3;
					this.j_jump_type = 0;
					this.gs.rsAddSound(3);
				} else
				{
					this.co_j.vx = -60;
					if(!this.j_mizu_f)
						this.co_j.vx = -120;
					this.j_jump_type = 5;
					this.co_j.muki = 1;
					if(this.co_j.vy > 0)
						this.co_j.vy = -25;
					else
						this.co_j.vy -= 50;
				}
				flag21 = true;
				this.j_djump_kf = true;
			}
		}
		if(this.j_mizu_f)
		{
			if(this.j_mizu_ac > 1)
				this.co_j.pt = 84;
			else
				this.co_j.pt = 83;
		} else
		if(this.j_jump_type == 0)
		{
			if(this.j_cannon_c > 0 && this.j_cannon_type == 2)
				this.co_j.pt = 1300;
			else
			if(this.j_cannon_c > 0 && this.j_cannon_type == 5)
				this.co_j.pt = 210;
			else
			if(this.j_cannon_c > 0 && Math.abs(this.co_j.vy) < 50)
				this.co_j.pt = 83;
			else
			if(this.co_j.vy < 20)
				this.co_j.pt = 101;
			else
				this.co_j.pt = 102;
		} else
		if(this.j_jump_type == 2)
		{
			if(Math.abs(this.co_j.vx) <= 60)
				this.co_j.pt = 103;
			else
				this.co_j.pt = 105;
		} else
		if(this.j_jump_type == 3)
			this.co_j.pt = 119;
		else
		if(this.j_jump_type == 4)
			this.co_j.pt = 100;
		else
		if(this.j_jump_type == 5)
			this.co_j.pt = 107;
		else
		if(this.j_jump_type == 6)
			this.co_j.pt = 109;
		else
		if(this.j_jump_type == 7)
		{
			this.co_j.pt = 1500;
			this.j_zan_f = false;
		} else
		{
			this.co_j.pt = 109;
		}
		this.co_j.ac = 2;
	}
	if(this.j_cannon_c > 0)
		if(this.j_cannon_type == 3)
		{
			this.co_j.pt = 1400;
			if(this.j_cannon_c <= 5)
			{
				this.co_j.pt = 102;
				this.co_j.vx = 0;
				if(this.co_j.jimen_f)
					this.co_j.pt = 100;
			}
		} else
		if(this.j_cannon_type == 4)
		{
			this.co_j.pt = 84;
			if(this.j_cannon_c <= 5)
			{
				this.co_j.pt = 102;
				this.co_j.vx = 0;
				if(this.co_j.jimen_f)
					this.co_j.pt = 100;
			}
		}
	if(this.j_jdai_f)
	{
		this.co_j.vx = 0;
		this.co_j.pt = 100;
		this.co_j.ac = 0;
		if((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.co_j.y % 32 == 0)
			if(this.gk.left_f)
			{
				this.co_j.vx = -30;
				this.co_j.x = ((this.co_j.x + 15) >> 5) * 32 - 6;
			} else
			if(this.gk.right_f)
			{
				this.co_j.vx = 30;
				this.co_j.x = ((this.co_j.x + 15) >> 5) * 32 + 6;
			}
	}
	if(this.j_hashigo_f)
		this.co_j.x = ((this.co_j.x + 15) >> 5) * 32;
	else
	if(this.co_j.vx < 0)
	{
		this.co_j.x += rounddown(this.co_j.vx / 10);
		if(this.yuka_ride_id >= 0)
			if(this.yo[this.yuka_ride_id].con >= 200 && this.yo[this.yuka_ride_id].con < 300)
			{
				var k21 = this.getSLOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(k21 >= 0)
				{
					this.co_j.y = k21;
					if(this.yo[this.yuka_ride_id].y > this.yo[this.yuka_ride_id].y2 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					this.co_j.y = this.yo[this.yuka_ride_id].y - 32;
					var l7;
					for(l7 = 0; l7 <= this.yuka_id_max; l7++)
					{
						if(this.yo[l7].con < 200 || this.yo[l7].con >= 300 || this.yo[l7].x2 != this.yo[this.yuka_ride_id].x || this.yo[l7].y2 != this.yo[this.yuka_ride_id].y)
							continue;
						var l21 = this.getSLOY(this.yo[l7].x, this.yo[l7].y, this.yo[l7].x2, this.yo[l7].y2);
						if(l21 < 0)
							continue;
						this.co_j.y = l21;
						break;
					}

					if(l7 > this.yuka_id_max)
						if(this.yo[this.yuka_ride_id].y <= this.yo[this.yuka_ride_id].y2)
							this.co_j.vy = 0;
						else
							this.co_j.vy = 75;
				}
			} else
			if(this.yo[this.yuka_ride_id].con >= 300 && this.yo[this.yuka_ride_id].con < 350)
			{
				var i22 = this.getSCOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(i22 >= 0)
				{
					this.co_j.y = i22;
					if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					var j22 = rounddown((this.yo[this.yuka_ride_id].x2 * 90) / 100);
					this.co_j.y = this.yo[this.yuka_ride_id].y - Math.floor(Math.sqrt(this.yo[this.yuka_ride_id].x2 * this.yo[this.yuka_ride_id].x2 - j22 * j22)) - 32;
				}
			} else
			if(this.yo[this.yuka_ride_id].con >= 350 && this.yo[this.yuka_ride_id].con < 400)
			{
				var k22 = this.getSHCOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(k22 >= 0)
				{
					this.co_j.y = k22;
					if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					this.co_j.y = this.yo[this.yuka_ride_id].y + 32;
				}
			} else
			if(this.yo[this.yuka_ride_id].con >= 400 && this.yo[this.yuka_ride_id].con < 450)
			{
				var l22 = this.getSWUpOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(l22 >= 0)
				{
					this.co_j.y = l22;
					if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					this.co_j.y = (this.yo[this.yuka_ride_id].y + 128) - 32;
					var i8 = 0;
					do
					{
						if(i8 > this.yuka_id_max)
							break;
						if(this.yo[i8].con >= 400 && this.yo[i8].con < 450 && this.yo[i8].x == this.yo[this.yuka_ride_id].x - 256 && this.yo[i8].y == this.yo[this.yuka_ride_id].y + 128)
						{
							var i23 = this.getSWUpOY(this.yo[i8].x, this.yo[i8].y, this.yo[i8].x2, this.yo[i8].y2);
							if(i23 >= 0)
							{
								this.co_j.y = i23;
								break;
							}
						}
						i8++;
					} while(true);
				}
			} else
			if(this.yo[this.yuka_ride_id].con >= 450 && this.yo[this.yuka_ride_id].con < 500)
			{
				var j23 = this.getSWDownOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(j23 >= 0)
				{
					this.co_j.y = j23;
					if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					this.co_j.y = this.yo[this.yuka_ride_id].y - 32;
					for(var j8 = 0; j8 <= this.yuka_id_max; j8++)
					{
						if(this.yo[j8].con < 400 || this.yo[j8].con >= 450 || this.yo[j8].x != this.yo[this.yuka_ride_id].x - 256 || this.yo[j8].y != this.yo[this.yuka_ride_id].y)
							continue;
						var k23 = this.getSWUpOY(this.yo[j8].x, this.yo[j8].y, this.yo[j8].x2, this.yo[j8].y2);
						if(k23 < 0)
							continue;
						this.co_j.y = k23;
						break;
					}

				}
			}
		if(this.co_j.jimen_f)
			if(word0 == 19)
			{
				if(i > (this.co_j.x + 15) >> 5)
				{
					this.co_j.y = (j2 - 1) * 32;
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2 - 1] == 19)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					else
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2] == 18)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 32);
					else
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2] < 19 && this.maps.map_bg[(this.co_j.x + 15) >> 5][j2] != 15)
					{
						this.co_j.vy = this.co_j.vx;
						if((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.co_j.vy < -40)
							this.co_j.vy = -40;
						if(this.co_j.vy >= 0)
						this.co_j.y -= rounddown(-this.co_j.vy / -10);
					}
				} else
				{
					this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
				}
			} else
			if(word0 == 18)
			{
				if(i > (this.co_j.x + 15) >> 5)
				{
					this.co_j.y = j2 * 32;
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2] == 19)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					else
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2 + 1] == 18)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, (j2 + 1) * 32);
					else
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2 + 1] < 18)
					{
						this.co_j.vy = this.co_j.vx * -1;
						this.co_j.y += rounddown(this.co_j.vx / -10);
					}
				} else
				{
					this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
				}
			} else
			if((word2 >= 20 || word2 == 10 || word2 == 15) && i > (this.co_j.x + 15) >> 5)
			{
				this.co_j.y = j2 * 32;
				if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2 + 1] == 18)
					this.co_j.y = this.getSakamichiY(this.co_j.x + 15, (j2 + 1) * 32);
			}
		if(this.co_j.jimen_f)
		{
			var k = (this.co_j.x + 15) >> 5;
			var word12 = this.maps.map_bg[k][this.co_j.y >> 5];
			var j3 = (this.co_j.y + 31) >> 5;
			var word4 = this.maps.map_bg[k][j3];
			if((word12 == 18 && !this.map_data_option[k][this.co_j.y >> 5] || word4 == 18 && !this.map_data_option[k][j3]) && i > k && this.co_j.y > this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31))
			{
				this.co_j.x = k * 32 + 17;
				this.co_j.vx = 0;
			}
		} else
		{
			var l = (this.co_j.x + 15) >> 5;
			var word13 = this.maps.map_bg[l][this.co_j.y >> 5];
			var k3 = (this.co_j.y + 31) >> 5;
			var word5 = this.maps.map_bg[l][k3];
			if(word0 == 19 && flag && i > l && (this.saka_mushi_y < 0 || k3 != this.saka_mushi_y && k3 != this.saka_mushi_y + 1))
			{
				this.co_j.y = j2 * 32 - 32;
				if(this.maps.map_bg[l][k3] == 19)
					this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
			}
			if((word13 == 18 && !this.map_data_option[l][this.co_j.y >> 5] || word5 == 18 && !this.map_data_option[l][k3]) && i > l)
			{
				this.co_j.x = l * 32 + 17;
				this.co_j.vx = 0;
			}
			if(word13 == 19 && !this.map_data_option[l][this.co_j.y >> 5] && i > l)
			{
				this.co_j.x = l * 32 + 17;
				this.co_j.vx = 0;
			}
		}
		if(this.a_hf)
		{
			for(var k8 = 0; k8 <= this.a_kazu; k8++)
			{
				if(!this.co_a[k8].gf)
					continue;
				var characterobject = this.co_a[k8];
				if(characterobject.c >= 100 && characterobject.c < 200)
				{
					if(this.co_j.x + 15 >= characterobject.x && this.co_j.x <= characterobject.x + 64 && this.co_j.y + 31 >= characterobject.y && this.co_j.y <= characterobject.y + 13)
					{
						this.co_j.x = characterobject.x + 65;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject.c == 300)
				{
					if(characterobject.c3 < 200 && this.co_j.x + 15 >= characterobject.x && this.co_j.x <= characterobject.x + 48 && this.co_j.y + 31 >= characterobject.y && this.co_j.y <= characterobject.y + 31)
					{
						this.co_j.x = characterobject.x + 49;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject.c >= 400 && characterobject.c < 500)
				{
					if(this.co_j.x + 15 < characterobject.x || this.co_j.x > characterobject.x + 80 || this.co_j.y + 31 < characterobject.y || this.co_j.y > characterobject.y + 63)
						continue;
					if(characterobject.c4 == 16 && characterobject.c == 410 && this.souko_count3 != 1 && characterobject.vx != 1)
					{
						if(this.maps.getBGCode(characterobject.x, characterobject.y + 64) < 18 && this.maps.getBGCode(characterobject.x + 31, characterobject.y + 64) < 18 && this.maps.getBGCode(characterobject.x + 63, characterobject.y + 64) < 18 && this.maps.getBGCode(characterobject.x + 95, characterobject.y + 64) < 18)
						{
							var flag9 = false;
							var j29 = -1;
							var j11 = 0;
							do
							{
								if(j11 > this.a_kazu)
									break;
								if(this.co_a[j11].c == 410 && this.co_a[j11].c4 == 16 && j11 != k8 && this.co_a[j11].x + 95 >= characterobject.x && this.co_a[j11].x <= characterobject.x + 95 && characterobject.y + 64 >= this.co_a[j11].y && characterobject.y + 16 <= this.co_a[j11].y)
								{
									flag9 = true;
									characterobject.y = this.co_a[j11].y - 64;
									j29 = j11;
									break;
								}
								j11++;
							} while(true);
							if(flag9)
							{
								var l23 = characterobject.x;
								var i28 = characterobject.x;
								characterobject.x = (this.co_j.x + 15) - 96;
								if(characterobject.x < l23 - 4)
								{
									characterobject.x = l23 - 4;
									if(this.co_j.vx < -40)
										this.co_j.vx = -40;
								}
								if(this.maps.getBGCode(characterobject.x, characterobject.y) >= 18 || this.maps.getBGCode(characterobject.x, characterobject.y + 31) >= 18 || this.maps.getBGCode(characterobject.x, characterobject.y + 63) >= 18)
								{
									characterobject.x = (characterobject.x >> 5) * 32 + 32;
									this.co_j.vx = 0;
								}
								for(var k11 = 0; k11 <= this.a_kazu; k11++)
								{
									if(this.co_a[k11].c != 3000 || this.co_a[k11].y != characterobject.y || i28 <= this.co_a[k11].x || characterobject.x > this.co_a[k11].x)
										continue;
									characterobject.x = this.co_a[k11].x;
									this.co_j.vx = 0;
									if(this.co_a[k11].c3 == 1)
										characterobject.vx = 1;
								}

								var flag10 = false;
								var l11 = 0;
								do
								{
									if(l11 > this.a_kazu)
										break;
									if(this.co_a[l11].c == 410 && this.co_a[l11].c4 == 16 && l11 != k8 && this.co_a[l11].x + 95 >= characterobject.x && this.co_a[l11].x <= characterobject.x + 95 && characterobject.y + 64 >= this.co_a[l11].y && characterobject.y + 16 <= this.co_a[l11].y)
									{
										flag10 = true;
										characterobject.y = this.co_a[l11].y - 64;
										break;
									}
									l11++;
								} while(true);
								if(!flag10 && this.maps.getBGCode(characterobject.x, characterobject.y + 64) < 18 && this.maps.getBGCode(characterobject.x + 31, characterobject.y + 64) < 18 && this.maps.getBGCode(characterobject.x + 63, characterobject.y + 64) < 18 && this.maps.getBGCode(characterobject.x + 95, characterobject.y + 64) < 18)
								{
									if(j29 >= 0)
										characterobject.x = this.co_a[j29].x - 96;
									else
										characterobject.x = ((characterobject.x + 31) >> 5) * 32;
									this.co_j.vx = 0;
								}
								if(j29 >= 0 && this.co_a[j29].x - 96 >= characterobject.x && this.maps.getBGCode(this.co_a[j29].x - 96, characterobject.y + 64) < 18 && this.maps.getBGCode((this.co_a[j29].x - 96) + 31, characterobject.y + 64) < 18 && this.maps.getBGCode((this.co_a[j29].x - 96) + 63, characterobject.y + 64) < 18 && this.maps.getBGCode((this.co_a[j29].x - 96) + 95, characterobject.y + 64) < 18)
									characterobject.x = this.co_a[j29].x - 96;
								this.co_j.x = characterobject.x + 81;
							} else
							{
								this.co_j.x = characterobject.x + 81;
								this.co_j.vx = 0;
							}
							continue;
						}
						var i24 = characterobject.x;
						var j28 = characterobject.x;
						characterobject.x = (this.co_j.x + 15) - 96;
						if(characterobject.x < i24 - 4)
						{
							characterobject.x = i24 - 4;
							if(this.co_j.vx < -40)
								this.co_j.vx = -40;
						}
						if(this.maps.getBGCode(characterobject.x, characterobject.y) >= 18 || this.maps.getBGCode(characterobject.x, characterobject.y + 31) >= 18 || this.maps.getBGCode(characterobject.x, characterobject.y + 63) >= 18)
						{
							characterobject.x = (characterobject.x >> 5) * 32 + 32;
							this.co_j.vx = 0;
						}
						for(var i12 = 0; i12 <= this.a_kazu; i12++)
							if(this.co_a[i12].c == 410 && this.co_a[i12].c4 == 16 && i12 != k8 && this.co_a[i12].x + 95 >= characterobject.x && this.co_a[i12].x <= characterobject.x + 95 && characterobject.y + 63 >= this.co_a[i12].y && characterobject.y <= this.co_a[i12].y + 63)
								characterobject.x = this.co_a[i12].x + 96;

						if(this.maps.getBGCode(characterobject.x, characterobject.y + 64) < 18 && this.maps.getBGCode(characterobject.x + 31, characterobject.y + 64) < 18 && this.maps.getBGCode(characterobject.x + 63, characterobject.y + 64) < 18 && this.maps.getBGCode(characterobject.x + 95, characterobject.y + 64) < 18)
							characterobject.x = ((characterobject.x + 31) >> 5) * 32;
						if((characterobject.x + 31) >> 5 < (j28 + 31) >> 5 && this.maps.getBGCode(((characterobject.x + 31) >> 5) * 32, characterobject.y + 64) < 18 && this.maps.getBGCode(((characterobject.x + 31) >> 5) * 32 + 31, characterobject.y + 64) < 18 && this.maps.getBGCode(((characterobject.x + 31) >> 5) * 32 + 63, characterobject.y + 64) < 18 && this.maps.getBGCode(((characterobject.x + 31) >> 5) * 32 + 95, characterobject.y + 64) < 18)
							characterobject.x = ((characterobject.x + 31) >> 5) * 32;
						for(var j12 = 0; j12 <= this.a_kazu; j12++)
						{
							if(this.co_a[j12].c != 3000 || this.co_a[j12].y != characterobject.y || j28 <= this.co_a[j12].x || characterobject.x > this.co_a[j12].x)
								continue;
							characterobject.x = this.co_a[j12].x;
							this.co_j.vx = 0;
							if(this.co_a[j12].c3 == 1)
								characterobject.vx = 1;
						}

						this.co_j.x = characterobject.x + 81;
					} else
					{
						this.co_j.x = characterobject.x + 81;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject.c == 500)
				{
					if(this.co_j.x + 15 >= characterobject.x && this.co_j.x <= characterobject.x + 80 && this.co_j.y + 31 >= characterobject.y && this.co_j.y <= characterobject.y + 13)
					{
						this.co_j.x = characterobject.x + 81;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject.c >= 600 && characterobject.c < 700)
				{
					if(this.co_j.x + 15 >= characterobject.x && this.co_j.x <= characterobject.x + 48 && this.co_j.y + 31 >= characterobject.y + 16 && this.co_j.y <= characterobject.y + 47)
					{
						this.co_j.x = characterobject.x + 49;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject.c == 700)
				{
					if(this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13 && this.co_j.x + 15 >= characterobject.x && this.co_j.x <= characterobject.x + 16 && this.co_j.y + 31 >= characterobject.y && this.co_j.y <= characterobject.y + 31)
					{
						this.co_j.x = characterobject.x + 17;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject.c == 3100 && this.co_j.x + 15 >= characterobject.x && this.co_j.x + 15 <= characterobject.x + 31 && this.co_j.y + 31 >= characterobject.y && this.co_j.y <= characterobject.y + 127 && j5 + 15 >= characterobject.x + 32)
				{
					this.co_j.x = (characterobject.x + 32) - 15;
					this.co_j.vx = 0;
				}
			}

		}
		if(this.yuka_id_max >= 0)
			this.atariYuka(0);
		var i1 = (this.co_j.x + 15) >> 5;
		var word14 = this.maps.map_bg[i1][this.co_j.y >> 5];
		var l3 = (this.co_j.y + 31) >> 5;
		var word6 = this.maps.map_bg[i1][l3];
		if(word14 >= 20 || word6 >= 20)
		{
			this.co_j.x = i1 * 32 + 17;
			this.co_j.vx = 0;
		}
		if(this.co_j.vx >= 0)
			this.j_cannon_c = 0;
	} else
	if(this.co_j.vx > 0)
	{
		this.co_j.x += rounddown(this.co_j.vx / 10);
		if(this.yuka_ride_id >= 0)
			if(this.yo[this.yuka_ride_id].con >= 200 && this.yo[this.yuka_ride_id].con < 300)
			{
				var j24 = this.getSLOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(j24 >= 0)
				{
					this.co_j.y = j24;
					if(this.yo[this.yuka_ride_id].y < this.yo[this.yuka_ride_id].y2 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					this.co_j.y = this.yo[this.yuka_ride_id].y2 - 32;
					var l8;
					for(l8 = 0; l8 <= this.yuka_id_max; l8++)
					{
						if(this.yo[l8].con < 200 || this.yo[l8].con >= 300 || this.yo[l8].x != this.yo[this.yuka_ride_id].x2 || this.yo[l8].y != this.yo[this.yuka_ride_id].y2)
							continue;
						var k24 = this.getSLOY(this.yo[l8].x, this.yo[l8].y, this.yo[l8].x2, this.yo[l8].y2);
						if(k24 < 0)
							continue;
						this.co_j.y = k24;
						break;
					}

					if(l8 > this.yuka_id_max)
						if(this.yo[this.yuka_ride_id].y >= this.yo[this.yuka_ride_id].y2)
							this.co_j.vy = 0;
						else
							this.co_j.vy = 75;
				}
			} else
			if(this.yo[this.yuka_ride_id].con >= 300 && this.yo[this.yuka_ride_id].con < 350)
			{
				var l24 = this.getSCOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(l24 >= 0)
				{
					this.co_j.y = l24;
					if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					var i25 = rounddown((this.yo[this.yuka_ride_id].x2 * 90) / 100);
					this.co_j.y = this.yo[this.yuka_ride_id].y - Math.floor(Math.sqrt(this.yo[this.yuka_ride_id].x2 * this.yo[this.yuka_ride_id].x2 - i25 * i25)) - 32;
				}
			} else
			if(this.yo[this.yuka_ride_id].con >= 350 && this.yo[this.yuka_ride_id].con < 400)
			{
				var j25 = this.getSHCOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(j25 >= 0)
				{
					this.co_j.y = j25;
					if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					this.co_j.y = this.yo[this.yuka_ride_id].y + 32;
				}
			} else
			if(this.yo[this.yuka_ride_id].con >= 400 && this.yo[this.yuka_ride_id].con < 450)
			{
				var k25 = this.getSWUpOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(k25 >= 0)
				{
					this.co_j.y = k25;
					if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					this.co_j.y = this.yo[this.yuka_ride_id].y - 32;
					var i9 = 0;
					do
					{
						if(i9 > this.yuka_id_max)
							break;
						if(this.yo[i9].con >= 450 && this.yo[i9].con < 500 && this.yo[i9].x == this.yo[this.yuka_ride_id].x + 256 && this.yo[i9].y == this.yo[this.yuka_ride_id].y)
						{
							var l25 = this.getSWDownOY(this.yo[i9].x, this.yo[i9].y, this.yo[i9].x2, this.yo[i9].y2);
							if(l25 >= 0)
							{
								this.co_j.y = l25;
								break;
							}
						}
						i9++;
					} while(true);
				}
			} else
			if(this.yo[this.yuka_ride_id].con >= 450 && this.yo[this.yuka_ride_id].con < 500)
			{
				var i26 = this.getSWDownOY(this.yo[this.yuka_ride_id].x, this.yo[this.yuka_ride_id].y, this.yo[this.yuka_ride_id].x2, this.yo[this.yuka_ride_id].y2);
				if(i26 >= 0)
				{
					this.co_j.y = i26;
					if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
						this.co_j.y = ((this.co_j.y + 31) >> 5) * 32 - 32;
				} else
				{
					this.co_j.y = (this.yo[this.yuka_ride_id].y + 128) - 32;
					for(var j9 = 0; j9 <= this.yuka_id_max; j9++)
					{
						if(this.yo[j9].con < 450 || this.yo[j9].con >= 500 || this.yo[j9].x != this.yo[this.yuka_ride_id].x + 256 || this.yo[j9].y != this.yo[this.yuka_ride_id].y + 128)
							continue;
						var j26 = this.getSWDownOY(this.yo[j9].x, this.yo[j9].y, this.yo[j9].x2, this.yo[j9].y2);
						if(j26 < 0)
							continue;
						this.co_j.y = j26;
						break;
					}

				}
			}
		if(this.co_j.jimen_f)
			if(word0 == 18)
			{
				if(i < (this.co_j.x + 15) >> 5)
				{
					this.co_j.y = (j2 - 1) * 32;
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2 - 1] == 18)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					else
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2] == 19)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 32);
					else
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2] < 18 && this.maps.map_bg[(this.co_j.x + 15) >> 5][j2] != 15)
					{
						this.co_j.vy = this.co_j.vx * -1;
						if((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.co_j.vy < -40)
							this.co_j.vy = -40;
						this.co_j.y += rounddown(this.co_j.vy / -10);
					}
				} else
				{
					this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
				}
			} else
			if(word0 == 19)
			{
				if(i < (this.co_j.x + 15) >> 5)
				{
					this.co_j.y = j2 * 32;
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2] == 18)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					else
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2 + 1] == 19)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, (j2 + 1) * 32);
					else
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2 + 1] < 18)
					{
						this.co_j.vy = this.co_j.vx;
						this.co_j.y += rounddown(this.co_j.vx / 10);
					}
				} else
				{
					this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
				}
			} else
			if((word2 >= 20 || word2 == 10 || word2 == 15) && i < (this.co_j.x + 15) >> 5)
			{
				this.co_j.y = j2 * 32;
				if(this.maps.map_bg[(this.co_j.x + 15) >> 5][j2 + 1] == 19)
					this.co_j.y = this.getSakamichiY(this.co_j.x + 15, (j2 + 1) * 32);
			}
		if(this.co_j.jimen_f)
		{
			var j1 = (this.co_j.x + 15) >> 5;
			var word15 = this.maps.map_bg[j1][this.co_j.y >> 5];
			var i4 = (this.co_j.y + 31) >> 5;
			var word7 = this.maps.map_bg[j1][i4];
			if((word15 == 19 && !this.map_data_option[j1][this.co_j.y >> 5] || word7 == 19 && !this.map_data_option[j1][i4]) && i < j1 && this.co_j.y > this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31))
			{
				this.co_j.x = j1 * 32 - 16;
				this.co_j.vx = 0;
			}
		} else
		{
			var k1 = (this.co_j.x + 15) >> 5;
			var word16 = this.maps.map_bg[k1][this.co_j.y >> 5];
			var j4 = (this.co_j.y + 31) >> 5;
			var word8 = this.maps.map_bg[k1][j4];
			if(word0 == 18 && flag && i < k1 && (this.saka_mushi_y < 0 || j4 != this.saka_mushi_y && j4 != this.saka_mushi_y + 1))
			{
				this.co_j.y = j2 * 32 - 32;
				if(this.maps.map_bg[k1][j4] == 18)
					this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
			}
			if((word16 == 19 && !this.map_data_option[k1][this.co_j.y >> 5] || word8 == 19 && !this.map_data_option[k1][j4]) && i < k1)
			{
				this.co_j.x = k1 * 32 - 16;
				this.co_j.vx = 0;
			}
			if(word16 == 18 && !this.map_data_option[k1][this.co_j.y >> 5] && i < k1)
			{
				this.co_j.x = k1 * 32 - 16;
				this.co_j.vx = 0;
			}
		}
		if(this.a_hf)
		{
			for(var k9 = 0; k9 <= this.a_kazu; k9++)
			{
				if(!this.co_a[k9].gf)
					continue;
				var characterobject1 = this.co_a[k9];
				if(characterobject1.c >= 100 && characterobject1.c < 200)
				{
					if(this.co_j.x + 15 >= characterobject1.x && this.co_j.x <= characterobject1.x + 64 && this.co_j.y + 31 >= characterobject1.y && this.co_j.y <= characterobject1.y + 13)
					{
						this.co_j.x = characterobject1.x - 16;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject1.c == 300)
				{
					if(characterobject1.c3 < 200 && this.co_j.x + 15 >= characterobject1.x && this.co_j.x <= characterobject1.x + 48 && this.co_j.y + 31 >= characterobject1.y && this.co_j.y <= characterobject1.y + 31)
					{
						this.co_j.x = characterobject1.x - 16;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject1.c >= 400 && characterobject1.c < 500)
				{
					if(this.co_j.x + 15 < characterobject1.x || this.co_j.x > characterobject1.x + 80 || this.co_j.y + 31 < characterobject1.y || this.co_j.y > characterobject1.y + 63)
						continue;
					if(characterobject1.c4 == 16 && characterobject1.c == 410 && this.souko_count3 != 1 && characterobject1.vx != 1)
					{
						if(this.maps.getBGCode(characterobject1.x, characterobject1.y + 64) < 18 && this.maps.getBGCode(characterobject1.x + 31, characterobject1.y + 64) < 18 && this.maps.getBGCode(characterobject1.x + 63, characterobject1.y + 64) < 18 && this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 64) < 18)
						{
							var flag11 = false;
							var k29 = -1;
							var k12 = 0;
							do
							{
								if(k12 > this.a_kazu)
									break;
								if(this.co_a[k12].c == 410 && this.co_a[k12].c4 == 16 && k12 != k9 && this.co_a[k12].x + 95 >= characterobject1.x && this.co_a[k12].x <= characterobject1.x + 95 && characterobject1.y + 64 >= this.co_a[k12].y && characterobject1.y + 16 <= this.co_a[k12].y)
								{
									flag11 = true;
									characterobject1.y = this.co_a[k12].y - 64;
									k29 = k12;
									break;
								}
								k12++;
							} while(true);
							if(flag11)
							{
								var k26 = characterobject1.x;
								var k28 = characterobject1.x;
								characterobject1.x = this.co_j.x + 16;
								if(characterobject1.x > k26 + 4)
								{
									characterobject1.x = k26 + 4;
									if(this.co_j.vx > 40)
										this.co_j.vx = 40;
								}
								if(this.maps.getBGCode(characterobject1.x + 95, characterobject1.y) >= 18 || this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 31) >= 18 || this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 63) >= 18)
								{
									characterobject1.x = ((characterobject1.x + 95) >> 5) * 32 - 96;
									this.co_j.vx = 0;
								}
								for(var l12 = 0; l12 <= this.a_kazu; l12++)
								{
									if(this.co_a[l12].c != 3000 || this.co_a[l12].y != characterobject1.y || k28 >= this.co_a[l12].x || characterobject1.x < this.co_a[l12].x)
										continue;
									characterobject1.x = this.co_a[l12].x;
									this.co_j.vx = 0;
									if(this.co_a[l12].c3 == 1)
										characterobject1.vx = 1;
								}

								var flag12 = false;
								var i13 = 0;
								do
								{
									if(i13 > this.a_kazu)
										break;
									if(this.co_a[i13].c == 410 && this.co_a[i13].c4 == 16 && i13 != k9 && this.co_a[i13].x + 95 >= characterobject1.x && this.co_a[i13].x <= characterobject1.x + 95 && characterobject1.y + 64 >= this.co_a[i13].y && characterobject1.y + 16 <= this.co_a[i13].y)
									{
										flag12 = true;
										characterobject1.y = this.co_a[i13].y - 64;
										break;
									}
									i13++;
								} while(true);
								if(!flag12 && this.maps.getBGCode(characterobject1.x, characterobject1.y + 64) < 18 && this.maps.getBGCode(characterobject1.x + 31, characterobject1.y + 64) < 18 && this.maps.getBGCode(characterobject1.x + 63, characterobject1.y + 64) < 18 && this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 64) < 18)
								{
									if(k29 >= 0)
										characterobject1.x = this.co_a[k29].x + 96;
									else
										characterobject1.x = (characterobject1.x >> 5) * 32;
									this.co_j.vx = 0;
								}
								if(k29 >= 0 && this.co_a[k29].x + 96 <= characterobject1.x && this.maps.getBGCode(this.co_a[k29].x + 96, characterobject1.y + 64) < 18 && this.maps.getBGCode(this.co_a[k29].x + 96 + 31, characterobject1.y + 64) < 18 && this.maps.getBGCode(this.co_a[k29].x + 96 + 63, characterobject1.y + 64) < 18 && this.maps.getBGCode(this.co_a[k29].x + 96 + 95, characterobject1.y + 64) < 18)
									characterobject1.x = this.co_a[k29].x + 96;
								this.co_j.x = characterobject1.x - 16;
							} else
							{
								this.co_j.x = characterobject1.x - 16;
								this.co_j.vx = 0;
							}
							continue;
						}
						var l26 = characterobject1.x;
						var l28 = characterobject1.x;
						characterobject1.x = this.co_j.x + 16;
						if(characterobject1.x > l26 + 4)
						{
							characterobject1.x = l26 + 4;
							if(this.co_j.vx > 40)
								this.co_j.vx = 40;
						}
						if(this.maps.getBGCode(characterobject1.x + 95, characterobject1.y) >= 18 || this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 31) >= 18 || this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 63) >= 18)
						{
							characterobject1.x = ((characterobject1.x + 95) >> 5) * 32 - 96;
							this.co_j.vx = 0;
						}
						for(var j13 = 0; j13 <= this.a_kazu; j13++)
							if(this.co_a[j13].c == 410 && this.co_a[j13].c4 == 16 && j13 != k9 && this.co_a[j13].x + 95 >= characterobject1.x && this.co_a[j13].x <= characterobject1.x + 95 && characterobject1.y + 63 >= this.co_a[j13].y && characterobject1.y <= this.co_a[j13].y + 63)
								characterobject1.x = this.co_a[j13].x - 96;

						if(this.maps.getBGCode(characterobject1.x, characterobject1.y + 64) < 18 && this.maps.getBGCode(characterobject1.x + 31, characterobject1.y + 64) < 18 && this.maps.getBGCode(characterobject1.x + 63, characterobject1.y + 64) < 18 && this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 64) < 18)
							characterobject1.x = (characterobject1.x >> 5) * 32;
						if(characterobject1.x >> 5 > l28 >> 5 && this.maps.getBGCode((characterobject1.x >> 5) * 32, characterobject1.y + 64) < 18 && this.maps.getBGCode((characterobject1.x >> 5) * 32 + 31, characterobject1.y + 64) < 18 && this.maps.getBGCode((characterobject1.x >> 5) * 32 + 63, characterobject1.y + 64) < 18 && this.maps.getBGCode((characterobject1.x >> 5) * 32 + 95, characterobject1.y + 64) < 18)
							characterobject1.x = (characterobject1.x >> 5) * 32;
						for(var k13 = 0; k13 <= this.a_kazu; k13++)
						{
							if(this.co_a[k13].c != 3000 || this.co_a[k13].y != characterobject1.y || l28 >= this.co_a[k13].x || characterobject1.x < this.co_a[k13].x)
								continue;
							characterobject1.x = this.co_a[k13].x;
							this.co_j.vx = 0;
							if(this.co_a[k13].c3 == 1)
								characterobject1.vx = 1;
						}

						this.co_j.x = characterobject1.x - 16;
					} else
					{
						this.co_j.x = characterobject1.x - 16;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject1.c == 500)
				{
					if(this.co_j.x + 15 >= characterobject1.x && this.co_j.x <= characterobject1.x + 80 && this.co_j.y + 31 >= characterobject1.y && this.co_j.y <= characterobject1.y + 13)
					{
						this.co_j.x = characterobject1.x - 16;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject1.c >= 600 && characterobject1.c < 700)
				{
					if(this.co_j.x + 15 >= characterobject1.x && this.co_j.x <= characterobject1.x + 48 && this.co_j.y + 31 >= characterobject1.y + 16 && this.co_j.y <= characterobject1.y + 47)
					{
						this.co_j.x = characterobject1.x - 16;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject1.c == 700)
				{
					if(this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13 && this.co_j.x + 15 >= characterobject1.x && this.co_j.x <= characterobject1.x + 16 && this.co_j.y + 31 >= characterobject1.y && this.co_j.y <= characterobject1.y + 31)
					{
						this.co_j.x = characterobject1.x - 16;
						this.co_j.vx = 0;
					}
					continue;
				}
				if(characterobject1.c == 3110 && this.co_j.x + 15 >= characterobject1.x && this.co_j.x + 15 <= characterobject1.x + 31 && this.co_j.y + 31 >= characterobject1.y && this.co_j.y <= characterobject1.y + 127 && j5 + 15 < characterobject1.x)
				{
					this.co_j.x = characterobject1.x - 16;
					this.co_j.vx = 0;
				}
			}

		}
		if(this.yuka_id_max >= 0)
			this.atariYuka(1);
		var l1 = (this.co_j.x + 15) >> 5;
		var word17 = this.maps.map_bg[l1][this.co_j.y >> 5];
		var k4 = (this.co_j.y + 31) >> 5;
		var word9 = this.maps.map_bg[l1][k4];
		if(word17 >= 20 || word9 >= 20)
		{
			this.co_j.x = l1 * 32 - 16;
			this.co_j.vx = 0;
		}
		if(this.co_j.vx <= 0)
			this.j_cannon_c = 0;
	}
	if(!this.j_mizu_f && this.checkWater(this.co_j.x + 15, this.co_j.y + 15))
	{
		this.j_mizu_f = true;
		this.j_mizu_awa_c = 38;
	} else
	if(this.j_mizu_f && !this.checkWater(this.co_j.x + 15, this.co_j.y + 15))
	{
		this.j_jump_type = 2;
		this.co_j.pt = 101;
		this.co_j.ac = 0;
		this.co_j.vy = 0;
		this.j_jump_level = 1;
	}
	if(this.co_j.jimen_f)
	{
		if(this.gk.tr1_c >= 1 && this.gk.tr1_c <= 5)
		{
			if(this.jst_pc_attack == 1 && this.gk.tr1_c == 1 && this.gk.down_f && this.j_cannon_c <= 0 && (this.co_j.muki == 0 && this.maps.getBGCode(this.co_j.x + 14, this.co_j.y + 31) < 20 || this.co_j.muki == 1 && this.maps.getBGCode(this.co_j.x + 16, this.co_j.y + 31) < 20))
			{
				this.j_zan_f = false;
				this.j_jet_c = 0;
				if(this.co_j.muki == 0)
					this.co_j.vx = -140;
				else
					this.co_j.vx = 140;
				this.co_j.vy = 0;
				this.j_jump_type = 0;
				this.co_j.ac = 0;
				this.j_jump_level = 5;
				this.j_djump_kf = true;
				this.co_j.pt = 1400;
				this.j_cannon_c = 18;
				this.j_cannon_type = 3;
				this.gs.rsAddSound(17);
			} else
			if(this.jst_pc_attack == 2 && this.gk.tr1_c == 1 && this.gk.down_f && this.j_cannon_c <= 0 && (this.co_j.muki == 0 && this.maps.getBGCode(this.co_j.x + 14, this.co_j.y + 31) < 20 || this.co_j.muki == 1 && this.maps.getBGCode(this.co_j.x + 16, this.co_j.y + 31) < 20))
			{
				this.j_zan_f = false;
				this.j_jet_c = 0;
				if(this.co_j.muki == 0)
					this.co_j.vx = -140;
				else
					this.co_j.vx = 140;
				this.co_j.vy = 0;
				this.j_jump_type = 0;
				this.co_j.ac = 0;
				this.j_jump_level = 5;
				this.j_djump_kf = true;
				this.co_j.pt = 84;
				this.j_cannon_c = 18;
				this.j_cannon_type = 4;
				this.gs.rsAddSound(23);
			} else
			if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1) >= 20 || this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1) == 18 && !this.map_data_option[(this.co_j.x + 15) >> 5][(this.co_j.y - 1) >> 5])
			{
				if((this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13 || !this.gk.z_f) && this.gk.tr1_c == 1 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1) == 40)
				{
					var l14 = (this.co_j.x + 15) >> 5;
					var l16 = (this.co_j.y - 1) >> 5;
					this.hAttack(l14, l16);
				}
				l29 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1);
				if((this.j_tokugi != 12 && this.j_tokugi != 13 || !this.gk.z_f) && this.j_helm_f && (l29 == 20 || l29 == 69 && this.suberuyuka_hkf == 1))
				{
					this.gk.tr1_c = 6;
					var i15 = (this.co_j.x + 15) >> 5;
					var i17 = (this.co_j.y - 1) >> 5;
					if(this.maps.map_bg[(this.co_j.x + 15) >> 5][((this.co_j.y - 1) >> 5) + 1] == 4)
						this.maps.putBGCode(i15, i17, 4);
					else
						this.maps.putBGCode(i15, i17, 0);
					if(this.j_tokugi == 12 || this.j_tokugi == 13)
					{
						this.anaSet2(i15, i17);
					} else
					{
						this.mSet2(i15 * 32, i17 * 32, 80, 12, -24);
						this.mSet2(i15 * 32, i17 * 32, 80, -12, -24);
					}
					this.gs.rsAddSound(16);
					this.jZutuki(i15 * 32, i17 * 32 - 32, 0);
				}
			} else
			{
				if(this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
				{
					if(this.gk.tr1_c == 1 && this.j_fire_f)
						if(this.gk.z_f)
							this.jmSet(this.co_j.x, this.co_j.y, 100);
						else
						if(this.co_j.muki == 0)
							this.jmSet(this.co_j.x, this.co_j.y, 100);
						else
							this.jmSet(this.co_j.x, this.co_j.y, 105);
					if(this.gk.tr1_c > 0 && this.j_jet_fuel > 0 && !this.j_mizu_f && !this.gk.z_f && !this.gk.x_f && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) != 10)
					{
						this.j_jet_c = 100;
						this.j_jet_kf = true;
						this.co_j.vy = -90;
						this.j_jump_level = 1;
						this.co_j.x = ((this.co_j.x + 15) >> 5) * 32;
						this.co_j.vx = 0;
						if(this.j_jump_type == 2)
							this.j_jump_type = 0;
						if(this.gk.tr1_c == 1)
							this.gs.rsAddSound(26);
					}
				}
				if((this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13 || this.j_mizu_f) && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) != 10)
					if(this.j_mizu_f)
					{
						this.j_jump_type = 0;
						this.co_j.pt = 83;
						this.co_j.ac = 0;
						this.j_mizu_ac = 0;
						this.j_jet_kf = false;
						if(this.j_jdai_f)
						{
							this.co_j.y = (this.co_j.y >> 5) * 32;
							this.co_j.vy = -120;
							this.j_jump_level = 0;
							this.gs.rsAddSound(3);
						} else
						if(Math.abs(this.co_j.vx) > 50)
						{
							this.co_j.vy = -90;
							this.j_jump_level = 0;
						} else
						{
							this.co_j.vy = -70;
							this.j_jump_level = 0;
						}
					} else
					{
						this.j_jump_type = 0;
						this.co_j.pt = 101;
						this.co_j.ac = 0;
						if(this.jst_fire_xkey_only != 1 && this.j_fire_f)
							if(this.j_fire_type == 4)
							{
								if(this.co_jm[0].c == 0)
								{
									this.co_jm[0].c = 106;
									this.co_jm[0].x = this.co_j.x;
									this.co_jm[0].y = this.co_j.y;
									this.co_jm[0].vx = 20;
									this.co_jm[0].vy = 0;
									this.co_jm[0].c1 = 0;
									this.co_jm[0].c2 = 0;
									if(this.co_j.muki == 0)
									{
										this.co_jm[0].c = 101;
										this.co_jm[0].vx = -20;
									}
									this.jm_kazu++;
									this.gs.rsAddSound(23);
								}
								if(this.co_jm[1].c == 0)
								{
									this.co_jm[1].c = 106;
									this.co_jm[1].x = this.co_j.x;
									this.co_jm[1].y = this.co_j.y;
									this.co_jm[1].vx = 14;
									this.co_jm[1].vy = -14;
									this.co_jm[1].c1 = 0;
									this.co_jm[1].c2 = 0;
									if(this.co_j.muki == 0)
									{
										this.co_jm[1].c = 101;
										this.co_jm[1].vx = -14;
									}
									this.jm_kazu++;
									this.gs.rsAddSound(23);
								}
							} else
							if(this.j_fire_type == 5)
							{
								if(this.co_j.muki == 0)
									this.jmSet(this.co_j.x, this.co_j.y, 110);
								else
									this.jmSet(this.co_j.x, this.co_j.y, 115);
							} else
							if(this.co_j.muki == 0)
								this.jmSet(this.co_j.x, this.co_j.y, 100);
							else
								this.jmSet(this.co_j.x, this.co_j.y, 105);
						this.j_jet_kf = false;
						var i27 = Math.abs(this.co_j.vx);
						if(this.j_jdai_f)
						{
							this.co_j.y = (this.co_j.y >> 5) * 32;
							this.co_j.vy = -410;
							this.j_jump_level = 5;
							if(this.co_a[this.j_a_id].c3 <= 1)
							{
								this.co_j.vy = -230;
								this.gs.rsAddSound(3);
							} else
							{
								this.gs.rsAddSound(4);
								if(this.co_a[this.j_a_id].c4 == 1)
								{
									this.co_j.vy = -460;
									l29 = this.maps.map_bg[(this.co_j.x + 15) >> 5][(this.co_j.y - 1) >> 5];
									if(l29 <= 9)
									{
										for(var j6 = 0; j6 <= 5; j6++)
										{
											this.j_zan_x[j6] = j5;
											this.j_zan_y[j6] = this.co_a[this.j_a_id].y - 32;
											this.j_zan_pt[j6] = 101;
											this.j_zan_pth[j6] = this.co_j.muki;
										}

										this.j_zan_p = 0;
										this.j_zan_c = 0;
										this.j_zan_nagasa = 5;
										this.j_zan_f = true;
										this.j_zan_cf = true;
									}
								}
							}
						} else
						if(this.jst_pc_attack == 1 && this.j_cannon_c > 0 && this.j_cannon_type == 3)
						{
							this.co_j.pt = 1400;
							if(this.j_cannon_c <= 5)
							{
								this.co_j.pt = 102;
								this.co_j.vx = 0;
								if(this.co_j.jimen_f)
									this.co_j.pt = 100;
							}
						} else
						if(this.jst_pc_attack == 2 && this.j_cannon_c > 0 && this.j_cannon_type == 4)
						{
							this.co_j.pt = 84;
							if(this.j_cannon_c <= 5)
							{
								this.co_j.pt = 102;
								this.co_j.vx = 0;
								if(this.co_j.jimen_f)
									this.co_j.pt = 100;
							}
						} else
						if(this.jst_syouryuuken == 1 && this.gk.tr1_c == 1 && this.gk.up_f)
						{
							this.j_zan_f = false;
							this.j_jet_c = 0;
							this.co_j.vx = 0;
							this.co_j.vy = -140;
							this.j_jump_type = 0;
							this.co_j.ac = 0;
							this.j_jump_level = 5;
							this.j_djump_kf = true;
							this.co_j.pt = 1300;
							this.j_cannon_c = 9;
							this.j_cannon_type = 2;
							this.gs.rsAddSound(26);
						} else
						if(this.jst_syouryuuken == 2 && this.gk.tr1_c == 1 && this.gk.up_f)
						{
							this.j_zan_f = false;
							this.j_jet_c = 0;
							this.co_j.vx = 0;
							this.co_j.vy = -140;
							this.j_jump_type = 0;
							this.co_j.ac = 0;
							this.j_jump_level = 5;
							this.j_djump_kf = true;
							this.co_j.pt = 210;
							this.j_cannon_c = 9;
							this.j_cannon_type = 5;
							this.gs.rsAddSound(23);
						} else
						if(this.jst_jump_level_fix == 1)
						{
							this.co_j.vy = -150;
							this.j_jump_level = 1;
							this.gs.rsAddSound(3);
						} else
						if(this.jst_jump_level_fix == 2)
						{
							this.co_j.vy = -190;
							this.j_jump_level = 1;
							this.gs.rsAddSound(3);
						} else
						if(this.jst_jump_level_fix == 3)
						{
							this.co_j.vy = -230;
							this.j_jump_level = 1;
							this.gs.rsAddSound(3);
						} else
						if(this.jst_jump_level_fix == 4)
						{
							this.co_j.vy = -260;
							this.j_jump_level = 1;
							this.gs.rsAddSound(3);
						} else
						if(i27 == 0)
						{
							this.co_j.vy = -150;
							this.j_jump_level = 1;
							this.gs.rsAddSound(3);
						} else
						if(i27 < 60)
						{
							this.co_j.vy = -230;
							this.j_jump_level = 2;
							this.gs.rsAddSound(3);
						} else
						if(i27 == 60)
						{
							this.co_j.vy = -260;
							this.j_jump_level = 3;
							this.gs.rsAddSound(3);
						} else
						if(i27 < 120)
						{
							this.co_j.vy = -290;
							this.j_jump_level = 4;
							this.gs.rsAddSound(3);
						} else
						{
							this.co_j.vy = -340;
							this.j_jump_level = 5;
							if(this.jst_high_sjump == 1)
								this.co_j.vy = -390;
							l29 = this.maps.map_bg[(this.co_j.x + 15) >> 5][(this.co_j.y - 1) >> 5];
							if(l29 <= 9)
							{
								for(var k6 = 0; k6 <= 5; k6++)
								{
									this.j_zan_x[k6] = j5;
									this.j_zan_y[k6] = k5;
									this.j_zan_pt[k6] = 101;
									this.j_zan_pth[k6] = this.co_j.muki;
								}

								this.j_zan_p = 0;
								this.j_zan_c = 0;
								this.j_zan_nagasa = 5;
								this.j_zan_f = true;
								this.j_zan_cf = true;
								this.gs.rsAddSound(4);
							}
						}
					}
			}
		} else
		if(word0 != 18 && word0 != 19 || this.maps.map_bg[(this.co_j.x + 15) >> 5][(this.co_j.y + 31) >> 5] >= 18)
			this.co_j.vy = 0;
	} else
	{
		if((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && !this.j_hashigo_f && !this.j_mizu_f && Math.abs((this.co_j.x >> 5) * 32 - this.co_j.x) < 6)
			this.co_j.x = ((this.co_j.x + 15) >> 5) * 32;
		if(!this.j_mizu_f)
		{
			if(this.j_hashigo_f)
			{
				if(this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13 && this.gk.tr1_c == 1 && !this.gk.up_f && !this.gk.down_f)
					if(this.co_j.muki == 0 && this.maps.getBGCode(this.co_j.x - 1, this.co_j.y + 31) < 18 && this.maps.getBGCode(this.co_j.x - 1, this.co_j.y) < 18 && this.maps.getBGCode(this.co_j.x - 1, this.co_j.y + 31) != 10 && this.maps.getBGCode(this.co_j.x - 1, this.co_j.y) != 10)
					{
						this.co_j.vy = 0;
						this.j_jump_level = 1;
						this.j_jump_type = 0;
						this.co_j.pt = 103;
						this.co_j.ac = 0;
						this.gs.rsAddSound(3);
						this.co_j.vx = -100;
						if(this.maps.getBGCode(this.co_j.x - 1, this.co_j.y - 32) < 20)
						{
							this.co_j.vy = -150;
							this.co_j.x -= 6;
						}
						this.co_j.y = ((this.co_j.y + 15) >> 5) * 32;
						this.j_hashigo_mushi_x = (this.co_j.x + 15) >> 5;
						this.j_hashigo_f = false;
					} else
					if(this.co_j.muki == 1 && this.maps.getBGCode(this.co_j.x + 32, this.co_j.y + 31) < 18 && this.maps.getBGCode(this.co_j.x + 32, this.co_j.y) < 18 && this.maps.getBGCode(this.co_j.x + 32, this.co_j.y + 31) != 10 && this.maps.getBGCode(this.co_j.x + 32, this.co_j.y) != 10)
					{
						this.co_j.vy = 0;
						this.j_jump_level = 1;
						this.j_jump_type = 0;
						this.co_j.pt = 103;
						this.co_j.ac = 0;
						this.gs.rsAddSound(3);
						this.co_j.vx = 100;
						if(this.maps.getBGCode(this.co_j.x + 32, this.co_j.y - 32) < 20)
						{
							this.co_j.vy = -150;
							this.co_j.x += 6;
						}
						this.co_j.y = ((this.co_j.y + 15) >> 5) * 32;
						this.j_hashigo_mushi_x = (this.co_j.x + 15) >> 5;
						this.j_hashigo_f = false;
					}
			} else
			{
				if(this.j_cannon_c <= 0)
					this.co_j.vy += 25;
				if(this.co_j.vy > 160)
					this.co_j.vy = 160;
				if(this.jst_slow_down == 1 && this.j_cannon_c <= 0 && this.j_jump_type != 6 && this.j_jump_type != 7 && this.co_j.vy > 0)
				{
					this.co_j.vy -= 10;
					if(this.co_j.vy > 70)
						this.co_j.vy = 70;
				}
				if(this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
				{
					if(this.co_j.vy >= 0)
						this.co_j.vy += 5;
					if(this.co_j.vy > 90)
						this.co_j.vy = 90;
				}
				if(this.jst_key_down == 1 && this.down_key_c == 1)
				{
					if(this.j_jump_type != 6)
						if(this.j_jump_type == 1)
						{
							if(this.co_j.vy < 100)
							{
								this.co_j.vx = 0;
								this.j_jump_type = 6;
								this.co_j.vy = 100;
							} else
							{
								this.j_jump_type = 6;
							}
						} else
						{
							this.co_j.vx = 0;
							this.j_jump_type = 6;
							if(this.co_j.vy < 100)
								this.co_j.vy = 100;
						}
				} else
				if(this.jst_key_down == 2 && this.down_key_c == 1 && this.j_jump_type != 7)
				{
					this.co_j.vx = 0;
					this.j_jump_type = 7;
					if(this.co_j.vy < 100)
						this.co_j.vy = 100;
					this.gs.rsAddSound(18);
				}
				if(this.jst_double_jump == 1 && this.j_djump_kf && this.gk.tr1_c == 1 && !flag21)
				{
					this.j_djump_kf = false;
					var j27 = Math.abs(this.co_j.vx);
					if(j27 < 60)
					{
						this.co_j.vy = -230;
						this.j_jump_level = 2;
						this.j_jump_type = 0;
						this.gs.rsAddSound(3);
					} else
					{
						this.co_j.vy = -260;
						this.j_jump_level = 3;
						this.j_jump_type = 0;
						this.gs.rsAddSound(3);
					}
				}
				if(this.j_jump_type == 5 && this.co_j.vy > 0)
				{
					this.co_j.vy -= 5;
					if(this.co_j.vy > 140)
						this.co_j.vy = 140;
				}
			}
			if(this.jst_fire_xkey_only != 1 && this.gk.tr1_c == 1 && this.j_fire_f)
				if(this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
				{
					if(this.gk.z_f)
						this.jmSet(this.co_j.x, this.co_j.y, 100);
					else
					if(this.co_j.muki == 0)
						this.jmSet(this.co_j.x, this.co_j.y, 100);
					else
						this.jmSet(this.co_j.x, this.co_j.y, 105);
				} else
				if(this.j_fire_type == 4)
				{
					if(this.co_jm[0].c == 0)
					{
						this.co_jm[0].c = 106;
						this.co_jm[0].x = this.co_j.x;
						this.co_jm[0].y = this.co_j.y;
						this.co_jm[0].vx = 20;
						this.co_jm[0].vy = 0;
						this.co_jm[0].c1 = 0;
						this.co_jm[0].c2 = 0;
						if(this.co_j.muki == 0)
						{
							this.co_jm[0].c = 101;
							this.co_jm[0].vx = -20;
						}
						this.jm_kazu++;
						this.gs.rsAddSound(23);
					}
					if(this.co_jm[1].c == 0)
					{
						this.co_jm[1].c = 106;
						this.co_jm[1].x = this.co_j.x;
						this.co_jm[1].y = this.co_j.y;
						this.co_jm[1].vx = 14;
						this.co_jm[1].vy = -14;
						this.co_jm[1].c1 = 0;
						this.co_jm[1].c2 = 0;
						if(this.co_j.muki == 0)
						{
							this.co_jm[1].c = 101;
							this.co_jm[1].vx = -14;
						}
						this.jm_kazu++;
						this.gs.rsAddSound(23);
					}
				} else
				if(this.j_fire_type == 5)
				{
					if(this.co_j.muki == 0)
						this.jmSet(this.co_j.x, this.co_j.y, 110);
					else
						this.jmSet(this.co_j.x, this.co_j.y, 115);
				} else
				if(this.co_j.muki == 0)
					this.jmSet(this.co_j.x, this.co_j.y, 100);
				else
					this.jmSet(this.co_j.x, this.co_j.y, 105);
			if(this.gk.tr1_c == 0)
				this.j_jet_kf = true;
			if(this.j_hashigo_f)
				this.j_jet_kf = false;
			if(this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13 || !this.gk.z_f && !this.gk.x_f)
				if(this.j_jet_kf && this.gk.tr1_c > 0 && this.j_jet_fuel > 0 && !this.j_mizu_f)
				{
					this.j_jet_c = 100;
					if(this.j_jump_type == 2)
						this.j_jump_type = 0;
					if(this.gk.tr1_c == 1)
						this.gs.rsAddSound(26);
				} else
				if(this.j_jet_c > 96)
					this.j_jet_c--;
				else
					this.j_jet_c = 0;
			if(this.j_jet_c >= 96)
			{
				this.j_jet_fuel--;
				if(this.j_jet_fuel < 0)
				{
					this.j_jet_fuel = 0;
					this.j_jet_c = 0;
				}
				if(this.gk.left_f)
					this.co_j.muki = 0;
				else
				if(this.gk.right_f)
					this.co_j.muki = 1;
				if(this.co_j.vy > -150)
				{
					this.co_j.vy -= 50;
					if(this.co_j.vy < -150)
						this.co_j.vy = -150;
					if((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.co_j.vy < -90)
						this.co_j.vy = -90;
				}
			}
		} else
		{
			if(this.gk.left_f)
				this.co_j.muki = 0;
			else
			if(this.gk.right_f)
				this.co_j.muki = 1;
			if(this.gk.tr1_c == 1)
			{
				var flag17 = false;
				l29 = this.maps.map_bg[(this.co_j.x + 15) >> 5][((this.co_j.y + 15) >> 5) - 1];
				if(l29 <= 9 && l29 != 4)
					flag17 = true;
				if((l29 == 8 || l29 == 9) && this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][((this.co_j.y + 15) >> 5) - 1] == 4)
					flag17 = false;
				if(flag17 && (this.co_j.y + 15) % 32 <= 8)
				{
					this.j_jump_type = 0;
					this.co_j.pt = 101;
					this.co_j.ac = 0;
					this.co_j.vy = -180;
					this.j_jump_level = 1;
					this.co_j.y = ((this.co_j.y + 15) >> 5) * 32 - 14;
					this.j_jet_kf = false;
					flag1 = true;
					if(this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
						if((this.co_j.x + 15) % 32 <= 6 && (this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][(this.co_j.y + 15) >> 5] >= 20 || this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][(this.co_j.y + 15) >> 5] == 18))
						{
							this.co_j.vx = -30;
							this.co_j.x = ((this.co_j.x + 15) >> 5) * 32 - 15;
						} else
						if((this.co_j.x + 15) % 32 >= 25 && this.maps.map_bg[((this.co_j.x + 15) >> 5) + 1][(this.co_j.y + 15) >> 5] >= 19)
						{
							this.co_j.vx = 30;
							this.co_j.x = ((this.co_j.x + 15) >> 5) * 32 + 16;
						} else
						{
							this.co_j.x = ((this.co_j.x + 15) >> 5) * 32;
						}
					this.mSet(this.co_j.x, ((this.co_j.y + 15) >> 5) * 32 - 32, 50);
					this.gs.rsAddSound(20);
				} else
				{
					this.j_jump_type = 0;
					this.co_j.ac = 0;
					if(this.j_mizu_ac <= 0)
					{
						this.j_mizu_ac = 4;
						this.co_j.pt = 84;
					}
					this.co_j.vy = -40;
					this.j_jump_level = 0;
					if(this.co_j.muki == 0)
					{
						this.co_j.vx -= 30;
						if(this.co_j.vx < -60)
							this.co_j.vx = -60;
					} else
					{
						this.co_j.vx += 30;
						if(this.co_j.vx > 60)
							this.co_j.vx = 60;
					}
				}
			} else
			{
				if(this.co_j.vx < 0)
				{
					if(this.co_j.muki == 0)
						this.co_j.vx++;
					else
						this.co_j.vx += 2;
					if(this.co_j.vx > 0)
						this.co_j.vx = 0;
				} else
				if(this.co_j.vx > 0)
				{
					if(this.co_j.muki == 1)
						this.co_j.vx--;
					else
						this.co_j.vx -= 2;
					if(this.co_j.vx < 0)
						this.co_j.vx = 0;
				}
				if(this.co_j.vy < 40)
				{
					this.co_j.vy += 5;
					if(this.co_j.vy > 40)
						this.co_j.vy = 40;
				} else
				if(this.co_j.vy > 40)
				{
					this.co_j.vy -= 20;
					if(this.co_j.vy < 40)
						this.co_j.vy = 40;
				}
				if(this.j_mizu_ac > 0)
				{
					this.j_mizu_ac--;
					if(this.j_mizu_ac > 1)
						this.co_j.pt = 84;
					else
						this.co_j.pt = 83;
				} else
				{
					this.co_j.pt = 83;
				}
			}
		}
	}
	if(this.co_j.vy < 0)
	{
		var i2 = (this.co_j.x + 15) >> 5;
		var i3 = this.co_j.y >> 5;
		var word3 = this.maps.map_bg[i2][i3];
		var k27 = this.co_j.vy;
		if(k27 < -320)
			k27 = -320;
		this.co_j.y += rounddown(k27 / 10);
		if(this.j_hashigo_f && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) <= 9)
		{
			this.j_hashigo_f = false;
			this.co_j.vy = 0;
		}
		if(this.j_mizu_f && !flag1)
		{
			var i20 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
			var flag18 = false;
			if(i20 <= 9 && i20 != 4)
				flag18 = true;
			if((i20 == 8 || i20 == 9) && this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][(this.co_j.y + 15) >> 5] == 4)
				flag18 = false;
			if(flag18)
			{
				this.co_j.y = ((this.co_j.y + 15) >> 5) * 32 + 17;
				this.co_j.vy = -10;
			}
		}
		if((this.co_j.x + 15) >> 5 != this.j_hashigo_mushi_x && (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10 || this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10))
		{
			var flag13 = false;
			var l13 = 0;
			do
			{
				if(l13 > this.a_kazu)
					break;
				if(this.co_a[l13].c == 410 && this.co_a[l13].x <= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_a[l13].x + 95 >= ((this.co_j.x + 15) >> 5) * 32 + 15 && (this.co_j.y >> 3) * 8 + 31 >= this.co_a[l13].y && (this.co_j.y >> 3) * 8 <= this.co_a[l13].y + 63)
				{
					flag13 = true;
					break;
				}
				l13++;
			} while(true);
			if(!flag13)
			{
				this.j_hashigo_f = true;
				this.co_j.y = (this.co_j.y >> 3) * 8;
			}
		}
		if(this.a_hf)
		{
			for(var l9 = 0; l9 <= this.a_kazu; l9++)
			{
				if(!this.co_a[l9].gf)
					continue;
				var characterobject2 = this.co_a[l9];
				if(characterobject2.c == 85)
				{
					if(this.co_j.x + 15 >= characterobject2.x && this.co_j.x + 15 <= characterobject2.x + 31 && this.co_j.y >= characterobject2.y && this.co_j.y <= characterobject2.y + 31)
					{
						this.co_j.y = characterobject2.y + 32;
						this.co_j.vy = 0;
						characterobject2.c = 0;
						this.maps.putBGCode(characterobject2.x >> 5, characterobject2.y >> 5, 23);
						this.gs.rsAddSound(13);
					}
					continue;
				}
				if(characterobject2.c >= 100 && characterobject2.c < 200)
				{
					if(this.co_j.x + 15 >= characterobject2.x && this.co_j.x <= characterobject2.x + 64 && this.co_j.y + 31 >= characterobject2.y && this.co_j.y <= characterobject2.y + 13)
					{
						this.co_j.y = characterobject2.y + 14;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject2.c == 300)
				{
					if(characterobject2.c3 < 200 && this.co_j.x + 15 >= characterobject2.x && this.co_j.x <= characterobject2.x + 48 && this.co_j.y + 31 >= characterobject2.y && this.co_j.y <= characterobject2.y + 31)
					{
						this.co_j.y = characterobject2.y + 32;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject2.c >= 400 && characterobject2.c < 500)
				{
					if(this.co_j.x + 15 < characterobject2.x || this.co_j.x > characterobject2.x + 80 || this.co_j.y + 31 < characterobject2.y || this.co_j.y > characterobject2.y + 63)
						continue;
					if(characterobject2.c4 == 17 && characterobject2.c == 410)
					{
						this.co_j.y = characterobject2.y + 64;
						this.co_j.vy = 0;
						if(characterobject2.y != characterobject2.vy || this.maps.getBGCode(characterobject2.x, characterobject2.y - 1) >= 18 && this.maps.getBGCode(characterobject2.x + 31, characterobject2.y - 1) >= 18 && this.maps.getBGCode(characterobject2.x + 63, characterobject2.y - 1) >= 18 && this.maps.getBGCode(characterobject2.x + 95, characterobject2.y - 1) >= 18)
							continue;
						characterobject2.vy = ((characterobject2.vy - 32) >> 5) * 32;
						if(characterobject2.vy < 320)
							characterobject2.vy = 320;
						else
							this.gs.rsAddSound(12);
					} else
					{
						this.co_j.y = characterobject2.y + 64;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject2.c == 500)
				{
					if(this.co_j.x + 15 >= characterobject2.x && this.co_j.x <= characterobject2.x + 80 && this.co_j.y + 31 >= characterobject2.y && this.co_j.y <= characterobject2.y + 13)
					{
						this.co_j.y = characterobject2.y + 14;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject2.c >= 600 && characterobject2.c < 700)
				{
					if(this.co_j.x + 15 >= characterobject2.x && this.co_j.x <= characterobject2.x + 48 && this.co_j.y + 31 >= characterobject2.y + 16 && this.co_j.y <= characterobject2.y + 47)
					{
						this.co_j.y = characterobject2.y + 48;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject2.c == 700)
				{
					if(this.co_j.x + 15 >= characterobject2.x && this.co_j.x <= characterobject2.x + 16 && this.co_j.y + 31 >= characterobject2.y && this.co_j.y <= characterobject2.y + 31)
					{
						this.co_j.y = characterobject2.y + 32;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject2.c == 3130 && this.co_j.x + 15 >= characterobject2.x && this.co_j.x + 15 <= characterobject2.x + 127 && this.co_j.y + 31 >= characterobject2.y && this.co_j.y <= characterobject2.y + 31 && k5 > characterobject2.y + 31)
				{
					this.co_j.y = characterobject2.y + 32;
					this.co_j.vy = 0;
				}
			}

		}
		if(this.yuka_id_max >= 0)
			this.atariYuka(2);
		var i5 = this.co_j.y >> 5;
		var word18 = this.maps.map_bg[(this.co_j.x + 15) >> 5][i5];
		if(word18 >= 20)
		{
			this.co_j.y = i5 * 32 + 32;
			this.co_j.vy = 0;
			if(word18 == 40)
			{
				var j15 = (this.co_j.x + 15) >> 5;
				var j17 = (this.co_j.y - 1) >> 5;
				this.hAttack(j15, j17);
			}
			if(this.j_helm_f && (word18 == 20 || word18 == 69 && this.suberuyuka_hkf == 1))
			{
				var k15 = (this.co_j.x + 15) >> 5;
				var k17 = i5;
				if(this.maps.map_bg[k15][k17 + 1] == 4)
					this.maps.putBGCode(k15, k17, 4);
				else
					this.maps.putBGCode(k15, k17, 0);
				if(this.j_tokugi == 12 || this.j_tokugi == 13)
				{
					this.anaSet2(k15, k17);
				} else
				{
					this.mSet2(k15 * 32, k17 * 32, 80, 12, -24);
					this.mSet2(k15 * 32, k17 * 32, 80, -12, -24);
				}
				this.gs.rsAddSound(16);
				this.jZutuki(k15 * 32, k17 * 32 - 32, 0);
			}
		}
		i5 = this.co_j.y >> 5;
		word18 = this.maps.map_bg[(this.co_j.x + 15) >> 5][i5];
		if(i3 > i5 && (word18 == 18 || word18 == 19) && !this.map_data_option[(this.co_j.x + 15) >> 5][i5])
		{
			this.co_j.y = i5 * 32 + 32;
			this.co_j.vy = 0;
			i5 = this.co_j.y >> 5;
			var word19 = this.maps.map_bg[(this.co_j.x + 15) >> 5][i5];
		}
		if(i3 > i5)
		{
			if(this.gk.right_f)
			{
				var word24 = this.maps.map_bg[(this.co_j.x + 16) >> 5][i3];
				var word32 = this.maps.map_bg[(this.co_j.x + 16) >> 5][i5];
				if(word24 <= 17 && word32 >= 20)
				{
					this.co_j.y = i5 * 32 + 32;
					this.co_j.vy = 0;
				}
			}
			if(this.gk.left_f)
			{
				var word25 = this.maps.map_bg[(this.co_j.x + 14) >> 5][i3];
				var word33 = this.maps.map_bg[(this.co_j.x + 14) >> 5][i5];
				if(word25 <= 17 && word33 >= 20)
				{
					this.co_j.y = i5 * 32 + 32;
					this.co_j.vy = 0;
				}
			}
		}
		if(this.j_cannon_c > 0 && this.co_j.vy >= 0)
		{
			this.j_cannon_c = 0;
			if(this.co_j.vx < -120)
				this.co_j.vx = -120;
			if(this.co_j.vx > 120)
				this.co_j.vx = 120;
		}
	} else
	if(this.co_j.vy > 0)
	{
		var j = (this.co_j.x + 15) >> 5;
		var k2 = (this.co_j.y + 31) >> 5;
		var word1 = this.maps.map_bg[j][k2];
		this.co_j.y += rounddown(this.co_j.vy / 10);
		if((this.co_j.x + 15) >> 5 != this.j_hashigo_mushi_x && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10)
		{
			var flag14 = false;
			var i14 = 0;
			do
			{
				if(i14 > this.a_kazu)
					break;
				if(this.co_a[i14].c == 410 && this.co_a[i14].x <= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_a[i14].x + 95 >= ((this.co_j.x + 15) >> 5) * 32 + 15 && (this.co_j.y >> 3) * 8 + 31 >= this.co_a[i14].y && (this.co_j.y >> 3) * 8 <= this.co_a[i14].y + 63)
				{
					flag14 = true;
					break;
				}
				i14++;
			} while(true);
			if(!flag14)
			{
				this.j_hashigo_f = true;
				this.co_j.y = (this.co_j.y >> 3) * 8;
			}
		}
		if(this.a_hf)
		{
			for(var i10 = 0; i10 <= this.a_kazu; i10++)
			{
				if(!this.co_a[i10].gf)
					continue;
				var characterobject3 = this.co_a[i10];
				if(characterobject3.c >= 100 && characterobject3.c < 200)
				{
					if(this.co_j.x + 15 >= characterobject3.x && this.co_j.x <= characterobject3.x + 64 && this.co_j.y + 31 >= characterobject3.y && this.co_j.y <= characterobject3.y + 13)
					{
						this.co_j.y = characterobject3.y - 32;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject3.c == 300)
				{
					if(characterobject3.c3 < 200 && this.co_j.x + 15 >= characterobject3.x && this.co_j.x <= characterobject3.x + 48 && this.co_j.y + 31 >= characterobject3.y && this.co_j.y <= characterobject3.y + 31)
					{
						this.co_j.y = characterobject3.y - 32;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject3.c >= 400 && characterobject3.c < 500)
				{
					if(this.co_j.x + 15 >= characterobject3.x && this.co_j.x <= characterobject3.x + 80 && this.co_j.y + 31 >= characterobject3.y && this.co_j.y <= characterobject3.y + 63)
					{
						this.co_j.y = characterobject3.y - 32;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject3.c == 500)
				{
					if(this.co_j.x + 15 >= characterobject3.x && this.co_j.x <= characterobject3.x + 80 && this.co_j.y + 31 >= characterobject3.y && this.co_j.y <= characterobject3.y + 13)
					{
						this.co_j.y = characterobject3.y - 32;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject3.c >= 600 && characterobject3.c < 700)
				{
					if(this.co_j.x + 15 >= characterobject3.x && this.co_j.x <= characterobject3.x + 48 && this.co_j.y + 31 >= characterobject3.y + 16 && this.co_j.y <= characterobject3.y + 47)
					{
						this.co_j.y = (characterobject3.y + 16) - 32;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject3.c == 700)
				{
					if(this.co_j.x + 15 >= characterobject3.x && this.co_j.x <= characterobject3.x + 16 && this.co_j.y + 31 >= characterobject3.y && this.co_j.y <= characterobject3.y + 31)
					{
						this.co_j.y = characterobject3.y - 32;
						this.co_j.vy = 0;
					}
					continue;
				}
				if(characterobject3.c == 3120 && this.co_j.x + 15 >= characterobject3.x && this.co_j.x + 15 <= characterobject3.x + 127 && this.co_j.y + 31 >= characterobject3.y && this.co_j.y <= characterobject3.y && k5 <= characterobject3.y - 32)
				{
					this.co_j.y = characterobject3.y - 32;
					this.co_j.vy = 0;
				}
			}

		}
		if(this.yuka_id_max >= 0)
			this.atariYuka(3);
		if(this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
		{
			if(this.ana_kazu > 0)
			{
				for(var l6 = 0; l6 <= this.t_kazu; l6++)
					if((this.co_t[l6].c == 1250 || this.co_t[l6].c == 1310) && this.co_j.x + 15 >= this.co_t[l6].x && this.co_j.x + 15 <= this.co_t[l6].x + 31 && this.co_j.y + 31 >= this.co_t[l6].y && this.co_j.y <= this.co_t[l6].y + 31)
						this.co_j.y = this.co_t[l6].y - 32;

			}
			var i7 = 0;
			do
			{
				if(i7 > this.t_kazu)
					break;
				if(this.co_t[i7].c >= 1200 && this.co_t[i7].c <= 1220 && Math.abs(this.co_j.x - this.co_t[i7].x) <= 24 && this.co_j.y + 32 > this.co_t[i7].y && (this.co_j.y + 32) - 12 < this.co_t[i7].y)
				{
					this.co_j.y = this.co_t[i7].y - 32;
					break;
				}
				i7++;
			} while(true);
		}
		var l4 = (this.co_j.y + 31) >> 5;
		var word10 = this.maps.map_bg[j][l4];
		if(k2 < l4)
		{
			var word34 = this.maps.map_bg[(this.co_j.x + 15) >> 5][k2];
			if(word34 == 18 || word34 == 19)
				if(this.map_data_option[(this.co_j.x + 15) >> 5][k2])
				{
					if(this.saka_mushi_y < 0 || k2 != this.saka_mushi_y && k2 != this.saka_mushi_y + 1)
					{
						this.co_j.vy = 0;
						this.co_j.y = k2 * 32;
						if(this.maps.map_bg[(this.co_j.x + 15) >> 5][(this.co_j.y + 31) >> 5] == 18 || this.maps.map_bg[(this.co_j.x + 15) >> 5][(this.co_j.y + 31) >> 5] == 19)
							this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					}
				} else
				{
					this.co_j.y = k2 * 32;
					this.co_j.vy = 0;
				}
		}
		l29 = this.maps.map_bg[(this.co_j.x + 15) >> 5][(this.co_j.y + 31) >> 5];
		if(l29 == 18 || l29 == 19)
			if(this.map_data_option[(this.co_j.x + 15) >> 5][(this.co_j.y + 31) >> 5])
			{
				if(this.saka_mushi_y < 0 || (this.co_j.y + 31) >> 5 != this.saka_mushi_y)
				{
					var l17 = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					if(l17 < this.co_j.y && l17 >= k5)
						this.co_j.y = l17;
				}
			} else
			{
				var i18 = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
				if(i18 < this.co_j.y)
					this.co_j.y = i18;
			}
		l4 = (this.co_j.y + 31) >> 5;
		word10 = this.maps.map_bg[j][l4];
		var flag20;
		if(word10 == 15 && k2 < l4)
		{
			flag20 = true;
			this.j_jump_type = 2;
			if(this.j_shitakara_mushi_y > 0 && this.j_shitakara_mushi_y == l4)
				flag20 = false;
		} else
		{
			flag20 = false;
		}
		if(word10 == 10 && !this.j_hashigo_f)
			flag20 = true;
		if(word10 >= 20 || flag20)
		{
			this.co_j.y = l4 * 32 - 32;
			this.co_j.vy = 0;
			l4 = (this.co_j.y + 31) >> 5;
			var word11 = this.maps.map_bg[j][l4];
		}
		if(this.j_hashigo_f)
		{
			var word41 = this.maps.map_bg[j][(this.co_j.y + 32) >> 5];
			if(word41 >= 20)
			{
				this.j_hashigo_f = false;
				this.j_shitakara_mushi_y = -1;
				this.co_j.direction = 0;
			}
		}
		if(k2 < l4 && !this.j_hashigo_f)
		{
			if(this.gk.right_f || this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
			{
				var word26 = this.maps.map_bg[(this.co_j.x + 16) >> 5][k2];
				var word35 = this.maps.map_bg[(this.co_j.x + 16) >> 5][l4];
				if(word35 == 10)
					word35 = 20;
				if(word26 <= 17 && word35 >= 20)
				{
					this.co_j.y = l4 * 32 - 32;
					this.co_j.vy = 0;
					this.co_j.pt = 103;
					this.co_j.ac = 1;
					this.co_j.x++;
					if(word35 == 18 || word35 == 19)
						this.co_j.y = this.getSakamichiY(this.co_j.x, this.co_j.y + 32);
				}
			}
			if(this.gk.left_f || this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
			{
				var word27 = this.maps.map_bg[(this.co_j.x + 14) >> 5][k2];
				var word36 = this.maps.map_bg[(this.co_j.x + 14) >> 5][l4];
				if(word36 == 10)
					word36 = 20;
				if(word27 <= 17 && word36 >= 20)
				{
					this.co_j.y = l4 * 32 - 32;
					this.co_j.vy = 0;
					this.co_j.pt = 103;
					this.co_j.ac = 1;
					this.co_j.x--;
					if(word36 == 18 || word36 == 19)
						this.co_j.y = this.getSakamichiY(this.co_j.x, this.co_j.y + 32);
				}
			}
		}
		if(!this.j_mizu_f)
		{
			var j20 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
			if(j20 == 4)
			{
				this.j_mizu_awa_c = 38;
				if(this.maps.getBGCode(this.co_j.x + 15, (this.co_j.y + 15) - 32) != 10)
				{
					this.mSet(this.co_j.x, ((this.co_j.y + 15) >> 5) * 32 - 32, 50);
					this.gs.rsAddSound(20);
				}
				if(this.co_j.vx < -60)
					this.co_j.vx = -60;
				else
				if(this.co_j.vx > 60)
					this.co_j.vx = 60;
			} else
			if((j20 == 8 || j20 == 9) && this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][(this.co_j.y + 15) >> 5] == 4)
			{
				this.mSet(this.co_j.x, ((this.co_j.y + 15) >> 5) * 32 - 32, 50);
				this.j_mizu_awa_c = 38;
				if(this.co_j.vx < -60)
					this.co_j.vx = -60;
				else
				if(this.co_j.vx > 60)
					this.co_j.vx = 60;
			}
		}
		if(this.j_cannon_c > 0 && this.co_j.vy <= 0)
		{
			this.j_cannon_c = 0;
			if(this.co_j.vx < -120)
				this.co_j.vx = -120;
			if(this.co_j.vx > 120)
				this.co_j.vx = 120;
		}
	}
	if(this.gk.down_f)
	{
		var i29 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
		if((i29 == 18 || i29 == 19) && this.map_data_option[(this.co_j.x + 15) >> 5][(this.co_j.y + 31) >> 5])
		{
			this.saka_mushi_y = (this.co_j.y + 31) >> 5;
			if(this.co_j.vy < 25)
				this.co_j.vy = 25;
		}
		if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) == 15)
		{
			this.j_shitakara_mushi_y = (this.co_j.y + 32) >> 5;
			this.j_jump_type = 2;
			this.co_j.ac = 0;
			this.saka_mushi_y = (this.co_j.y + 31) >> 5;
			if(this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
			{
				this.co_j.x = ((this.co_j.x + 15) >> 5) * 32;
				this.co_j.vx = 0;
			}
			if(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10)
			{
				var flag15 = false;
				var j14 = 0;
				do
				{
					if(j14 > this.a_kazu)
						break;
					if(this.co_a[j14].c == 410 && this.co_a[j14].x <= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_a[j14].x + 95 >= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_j.y + 31 >= this.co_a[j14].y && this.co_j.y <= this.co_a[j14].y + 63)
					{
						flag15 = true;
						break;
					}
					j14++;
				} while(true);
				if(!flag15)
					this.j_hashigo_f = true;
			}
		}
	}
	if(this.j_hashigo_f)
		this.co_j.pt = 210 + (this.co_j.ac >> 1);
	if((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.gk.tr1_c == 1 && !this.gk.z_f)
	{
		if(this.j_tail_f && (this.j_tail_ac <= 0 || this.j_tail_ac >= 8))
		{
			this.j_tail_ac = 1;
			this.co_j.pt = 116;
			this.j_zan_f = false;
		}
		if(this.j_gr_kazu > 0)
			if(this.grenade_type == 8)
			{
				if(this.j_fire_f)
					this.j_gr_kazu = 1;
				if(this.co_jm[0].c == 0 || this.co_jm[1].c == 0)
				{
					this.j_gr_kazu--;
					if(this.j_fire_type == 4)
					{
						if(this.co_jm[0].c == 0)
						{
							this.co_jm[0].c = 106;
							this.co_jm[0].x = this.co_j.x;
							this.co_jm[0].y = this.co_j.y;
							this.co_jm[0].vx = 20;
							this.co_jm[0].vy = 0;
							this.co_jm[0].c1 = 0;
							this.co_jm[0].c2 = 0;
							if(this.co_j.muki == 0)
							{
								this.co_jm[0].c = 101;
								this.co_jm[0].vx = -20;
							}
							this.jm_kazu++;
							this.gs.rsAddSound(23);
						}
						if(this.co_jm[1].c == 0)
						{
							this.co_jm[1].c = 106;
							this.co_jm[1].x = this.co_j.x;
							this.co_jm[1].y = this.co_j.y;
							this.co_jm[1].vx = 14;
							this.co_jm[1].vy = -14;
							this.co_jm[1].c1 = 0;
							this.co_jm[1].c2 = 0;
							if(this.co_j.muki == 0)
							{
								this.co_jm[1].c = 101;
								this.co_jm[1].vx = -14;
							}
							this.jm_kazu++;
							this.gs.rsAddSound(23);
						}
					} else
					if(this.j_fire_type == 5)
					{
						if(this.co_j.muki == 0)
							this.jmSet(this.co_j.x, this.co_j.y, 110);
						else
							this.jmSet(this.co_j.x, this.co_j.y, 115);
					} else
					if(this.co_j.muki == 0)
						this.jmSet(this.co_j.x, this.co_j.y, 100);
					else
						this.jmSet(this.co_j.x, this.co_j.y, 105);
				}
			} else
			if(this.grenade_type == 7)
				this.jmSet2(this.co_j.x, this.co_j.y, 50, 2);
			else
			if(this.grenade_type == 3 || this.grenade_type == 4)
			{
				if(this.co_j.muki == 0)
					this.jmSet(this.co_j.x, this.co_j.y, 60);
				else
					this.jmSet(this.co_j.x, this.co_j.y, 65);
			} else
			if(this.grenade_type == 9)
			{
				if(this.co_j.muki == 0)
					this.jmSet(this.co_j.x, this.co_j.y, 1207);
				else
					this.jmSet(this.co_j.x, this.co_j.y, 1206);
			} else
			if(this.co_j.muki == 0)
				this.jmSet(this.co_j.x, this.co_j.y, 200);
			else
				this.jmSet(this.co_j.x, this.co_j.y, 205);
	}
	if(this.grenade_type == 8 && this.j_fire_f)
		this.j_gr_kazu = 0;
	if(this.tr2_c == 1)
	{
		if(!this.j_hashigo_f || this.gk.x_f)
			if(this.j_gr_kazu > 0)
			{
				if(this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13)
					if(this.grenade_type == 8)
					{
						if(this.j_fire_f)
							this.j_gr_kazu = 1;
						if(this.co_jm[0].c == 0 || this.co_jm[1].c == 0)
						{
							this.j_gr_kazu--;
							if(this.j_fire_type == 4)
							{
								if(this.co_jm[0].c == 0)
								{
									this.co_jm[0].c = 106;
									this.co_jm[0].x = this.co_j.x;
									this.co_jm[0].y = this.co_j.y;
									this.co_jm[0].vx = 20;
									this.co_jm[0].vy = 0;
									this.co_jm[0].c1 = 0;
									this.co_jm[0].c2 = 0;
									if(this.co_j.muki == 0)
									{
										this.co_jm[0].c = 101;
										this.co_jm[0].vx = -20;
									}
									this.jm_kazu++;
									this.gs.rsAddSound(23);
								}
								if(this.co_jm[1].c == 0)
								{
									this.co_jm[1].c = 106;
									this.co_jm[1].x = this.co_j.x;
									this.co_jm[1].y = this.co_j.y;
									this.co_jm[1].vx = 14;
									this.co_jm[1].vy = -14;
									this.co_jm[1].c1 = 0;
									this.co_jm[1].c2 = 0;
									if(this.co_j.muki == 0)
									{
										this.co_jm[1].c = 101;
										this.co_jm[1].vx = -14;
									}
									this.jm_kazu++;
									this.gs.rsAddSound(23);
								}
							} else
							if(this.j_fire_type == 5)
							{
								if(this.co_j.muki == 0)
									this.jmSet(this.co_j.x, this.co_j.y, 110);
								else
									this.jmSet(this.co_j.x, this.co_j.y, 115);
							} else
							if(this.co_j.muki == 0)
								this.jmSet(this.co_j.x, this.co_j.y, 100);
							else
								this.jmSet(this.co_j.x, this.co_j.y, 105);
						}
					} else
					if(this.grenade_type == 7)
						this.jmSet2(this.co_j.x, this.co_j.y, 50, 2);
					else
					if(this.grenade_type == 9)
					{
						if(this.co_j.muki == 0)
							this.jmSet(this.co_j.x, this.co_j.y, 1207);
						else
							this.jmSet(this.co_j.x, this.co_j.y, 1206);
					} else
					if(this.grenade_type == 3 || this.grenade_type == 4)
					{
						if(this.co_j.muki == 0)
							this.jmSet(this.co_j.x, this.co_j.y, 60);
						else
							this.jmSet(this.co_j.x, this.co_j.y, 65);
					} else
					if(this.co_j.muki == 0)
						this.jmSet(this.co_j.x, this.co_j.y, 200);
					else
						this.jmSet(this.co_j.x, this.co_j.y, 205);
			} else
			if(this.j_fire_f && (!this.j_mizu_f || this.j_fire_mkf))
				if(this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
				{
					if(!this.gk.down_f)
						this.jmSet(this.co_j.x, this.co_j.y, 105);
				} else
				if(this.j_fire_type == 4)
				{
					if(this.co_jm[0].c == 0)
					{
						this.co_jm[0].c = 106;
						this.co_jm[0].x = this.co_j.x;
						this.co_jm[0].y = this.co_j.y;
						this.co_jm[0].vx = 20;
						this.co_jm[0].vy = 0;
						this.co_jm[0].c1 = 0;
						this.co_jm[0].c2 = 0;
						if(this.co_j.muki == 0)
						{
							this.co_jm[0].c = 101;
							this.co_jm[0].vx = -20;
						}
						this.jm_kazu++;
						this.gs.rsAddSound(23);
					}
					if(this.co_jm[1].c == 0)
					{
						this.co_jm[1].c = 106;
						this.co_jm[1].x = this.co_j.x;
						this.co_jm[1].y = this.co_j.y;
						this.co_jm[1].vx = 14;
						this.co_jm[1].vy = -14;
						this.co_jm[1].c1 = 0;
						this.co_jm[1].c2 = 0;
						if(this.co_j.muki == 0)
						{
							this.co_jm[1].c = 101;
							this.co_jm[1].vx = -14;
						}
						this.jm_kazu++;
						this.gs.rsAddSound(23);
					}
				} else
				if(this.co_j.muki == 0)
					this.jmSet(this.co_j.x, this.co_j.y, 100);
				else
					this.jmSet(this.co_j.x, this.co_j.y, 105);
		l29 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32);
		if(this.j_tokugi != 12 && this.j_tokugi != 13 || !this.gk.x_f)
			if(this.j_drell_f && (l29 == 20 || l29 == 69 && this.suberuyuka_hkf == 1))
			{
				var flag16 = false;
				var k14 = 0;
				do
				{
					if(k14 > this.a_kazu)
						break;
					if(this.co_a[k14].c == 410 && this.co_a[k14].x <= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_a[k14].x + 95 >= ((this.co_j.x + 15) >> 5) * 32 + 15 && this.co_j.y + 31 >= this.co_a[k14].y && this.co_j.y <= this.co_a[k14].y + 63)
					{
						flag16 = true;
						break;
					}
					k14++;
				} while(true);
				if(!flag16)
				{
					var l15 = (this.co_j.x + 15) >> 5;
					var j18 = (this.co_j.y + 32) >> 5;
					if(this.maps.map_bg[l15][j18 - 1] == 4 || this.maps.map_bg[l15 - 1][j18] == 4 || this.maps.map_bg[l15 + 1][j18] == 4)
						this.maps.putBGCode(l15, j18, 4);
					else
						this.maps.putBGCode(l15, j18, 0);
					if(this.j_tokugi == 12 || this.j_tokugi == 13)
					{
						this.anaSet(l15, j18);
					} else
					{
						this.mSet2(l15 * 32, j18 * 32, 80, 12, -24);
						this.mSet2(l15 * 32, j18 * 32, 80, -12, -24);
					}
					this.gs.rsAddSound(16);
					this.jZutuki(l15 * 32, j18 * 32 - 32, 0);
					this.co_j.x = l15 * 32;
					this.co_j.vx = 0;
					this.co_j.vy = 0;
					this.j_jump_type = 3;
					this.co_j.c = 120;
					this.co_j.c1 = 0;
					this.co_j.pt = 119;
				}
			} else
			if(this.j_tail_f && (this.j_tail_ac <= 0 || this.j_tail_ac >= 8) && (!this.j_hashigo_f || this.gk.x_f) && (this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13 || this.gk.down_f))
			{
				this.j_tail_ac = 1;
				this.co_j.pt = 116;
				this.j_zan_f = false;
			}
	}
	if(this.j_tail_ac >= 1)
	{
		this.j_zan_f = false;
		this.j_tail_ac++;
		if(this.j_tail_ac <= 4)
		{
			this.co_j.pt = 116;
			if(this.j_tail_type == 1 || this.j_tail_type == 3)
				if(this.co_j.muki == 0)
					this.jZutuki(this.co_j.x - 32, this.co_j.y, 1);
				else
					this.jZutuki(this.co_j.x + 32, this.co_j.y, 1);
		} else
		if(this.j_tail_ac <= 5)
		{
			this.co_j.pt = 1000;
			if(this.j_tail_type == 1 || this.j_tail_type == 3)
				if(this.co_j.muki == 0)
					this.jZutuki(this.co_j.x - 32, this.co_j.y, 1);
				else
					this.jZutuki(this.co_j.x + 32, this.co_j.y, 1);
			if(this.j_tail_type == 2 || this.j_tail_type == 3)
			{
				var i16;
				if(this.co_j.muki == 1)
					i16 = (this.co_j.x + 40) >> 5;
				else
					i16 = (this.co_j.x - 8) >> 5;
				var k18 = (this.co_j.y + 15) >> 5;
				if(this.maps.map_bg[i16][k18] == 20 || this.maps.map_bg[i16][k18] == 69 && this.suberuyuka_hkf == 1)
				{
					if(this.maps.map_bg[i16 - 1][k18] == 4)
						this.maps.putBGCode(i16, k18, 4);
					else
						this.maps.putBGCode(i16, k18, 0);
					this.mSet2(i16 * 32, k18 * 32, 80, 12, -24);
					this.mSet2(i16 * 32, k18 * 32, 80, -12, -24);
					this.gs.rsAddSound(16);
					this.jZutuki(i16 * 32, k18 * 32 - 32, 0);
				}
			}
		} else
		if(this.j_tail_ac <= 7)
			this.co_j.pt = 1000;
		else
		if(this.j_tail_ac <= 9)
		{
			this.co_j.pt = 116;
		} else
		{
			this.co_j.pt = 116;
			this.j_tail_ac = 0;
		}
	}
	if((this.j_tokugi == 12 || this.j_tokugi == 13) && (this.co_j.jimen_f || this.j_hashigo_f))
		if(this.gk.x_f)
		{
			var l18 = ((this.co_j.x + 15) >> 5) + 1;
			var j19 = (this.co_j.y + 32 + 15) >> 5;
			var word28 = this.maps.map_bg[l18][j19];
			var word37 = this.maps.map_bg[l18][j19 - 1];
			if((word28 == 20 || word28 == 40) && word37 <= 9 && (this.maps.map_bg[l18 - 1][j19 - 1] <= 10 || this.maps.map_bg[l18 - 1][j19 - 1] == 15 || this.maps.map_bg[l18 - 1][j19 - 1] == 18 || this.maps.map_bg[l18 - 1][j19 - 1] == 19))
			{
				var flag3 = false;
				var word39 = this.maps.map_bg[l18 - 1][j19];
				if(word39 >= 20 || word39 == 15 || word39 == 10 || this.maps.map_bg[l18 - 1][j19 - 1] == 10 || this.maps.map_bg[l18 - 1][j19 - 1] == 18 || this.maps.map_bg[l18 - 1][j19 - 1] == 19)
					flag3 = true;
				if(!flag3)
				{
					var j7 = 0;
					do
					{
						if(j7 > this.t_kazu)
							break;
						if((this.co_t[j7].c >= 1200 && this.co_t[j7].c < 1300 || this.co_t[j7].c == 1310) && Math.abs(this.co_j.x - this.co_t[j7].x) < 32 && j19 * 32 <= this.co_t[j7].y && j19 * 32 + 12 >= this.co_t[j7].y)
						{
							flag3 = true;
							break;
						}
						j7++;
					} while(true);
				}
				if(!flag3 && this.j_a_id >= 0 && (this.co_a[this.j_a_id].c >= 100 && this.co_a[this.j_a_id].c <= 120 || this.co_a[this.j_a_id].c >= 400 && this.co_a[this.j_a_id].c <= 600))
					flag3 = true;
				if(flag3)
				{
					if(word28 == 40)
					{
						this.hAttack(l18, j19);
						if(this.j_a_id >= 0)
						{
							if(this.co_a[this.j_a_id].c == 100 || this.co_a[this.j_a_id].c == 400 || this.co_a[this.j_a_id].c == 500)
								this.co_j.x = l18 * 32 - 32;
						} else
						{
							this.co_j.x = l18 * 32 - 32;
							this.co_j.y = j19 * 32 - 32;
						}
						this.co_j.vx = 0;
						this.co_j.c = 130;
						this.co_j.c1 = 0;
						this.co_j.muki = 1;
						if(!this.j_hashigo_f)
							this.co_j.pt = 100;
					} else
					{
						if(word37 == 4 || this.maps.map_bg[l18 - 1][j19] == 4 || this.maps.map_bg[l18 + 1][j19] == 4)
							this.maps.putBGCode(l18, j19, 4);
						else
							this.maps.putBGCode(l18, j19, 0);
						this.anaSet(l18, j19);
						if(this.j_a_id >= 0)
						{
							if(this.co_a[this.j_a_id].c == 100 || this.co_a[this.j_a_id].c == 400 || this.co_a[this.j_a_id].c == 500)
								this.co_j.x = l18 * 32 - 32;
						} else
						{
							this.co_j.x = l18 * 32 - 32;
							this.co_j.y = j19 * 32 - 32;
						}
						this.co_j.vx = 0;
						this.co_j.c = 130;
						this.co_j.c1 = 0;
						this.co_j.muki = 1;
						if(!this.j_hashigo_f)
							this.co_j.pt = 100;
						this.gs.rsAddSound(16);
					}
					var l20 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
					if(l20 == 18 || l20 == 19)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
				}
			}
		} else
		if(this.gk.z_f)
		{
			var i19 = ((this.co_j.x + 15) >> 5) - 1;
			var k19 = (this.co_j.y + 32 + 15) >> 5;
			var word29 = this.maps.map_bg[i19][k19];
			var word38 = this.maps.map_bg[i19][k19 - 1];
			if((word29 == 20 || word29 == 40) && word38 <= 9 && (this.maps.map_bg[i19 + 1][k19 - 1] <= 10 || this.maps.map_bg[i19 + 1][k19 - 1] == 15 || this.maps.map_bg[i19 + 1][k19 - 1] <= 18 || this.maps.map_bg[i19 + 1][k19 - 1] == 19))
			{
				var flag4 = false;
				var word40 = this.maps.map_bg[i19 + 1][k19];
				if(word40 >= 20 || word40 == 15 || word40 == 10 || this.maps.map_bg[i19 + 1][k19 - 1] == 10 || this.maps.map_bg[i19 + 1][k19 - 1] == 18 || this.maps.map_bg[i19 + 1][k19 - 1] == 19)
					flag4 = true;
				if(!flag4)
				{
					var k7 = 0;
					do
					{
						if(k7 > this.t_kazu)
							break;
						if((this.co_t[k7].c >= 1200 && this.co_t[k7].c < 1300 || this.co_t[k7].c == 1310) && Math.abs(this.co_j.x - this.co_t[k7].x) < 32 && k19 * 32 <= this.co_t[k7].y && k19 * 32 + 12 >= this.co_t[k7].y)
						{
							flag4 = true;
							break;
						}
						k7++;
					} while(true);
				}
				if(!flag4 && this.j_a_id >= 0 && (this.co_a[this.j_a_id].c >= 100 && this.co_a[this.j_a_id].c <= 120 || this.co_a[this.j_a_id].c >= 400 && this.co_a[this.j_a_id].c <= 600))
					flag4 = true;
				if(flag4)
				{
					if(word29 == 40)
					{
						this.hAttack(i19, k19);
						if(this.j_a_id >= 0)
						{
							if(this.co_a[this.j_a_id].c == 100 || this.co_a[this.j_a_id].c == 400 || this.co_a[this.j_a_id].c == 500)
								this.co_j.x = i19 * 32 + 32;
						} else
						{
							this.co_j.x = i19 * 32 + 32;
							this.co_j.y = k19 * 32 - 32;
						}
						this.co_j.vx = 0;
						this.co_j.c = 130;
						this.co_j.c1 = 0;
						this.co_j.muki = 0;
						if(!this.j_hashigo_f)
							this.co_j.pt = 100;
					} else
					{
						if(word38 == 4 || this.maps.map_bg[i19 - 1][k19] == 4 || this.maps.map_bg[i19 + 1][k19] == 4)
							this.maps.putBGCode(i19, k19, 4);
						else
							this.maps.putBGCode(i19, k19, 0);
						this.anaSet(i19, k19);
						if(this.j_a_id >= 0)
						{
							if(this.co_a[this.j_a_id].c == 100 || this.co_a[this.j_a_id].c == 400 || this.co_a[this.j_a_id].c == 500)
								this.co_j.x = i19 * 32 + 32;
						} else
						{
							this.co_j.x = i19 * 32 + 32;
							this.co_j.y = k19 * 32 - 32;
						}
						this.co_j.vx = 0;
						this.co_j.c = 130;
						this.co_j.c1 = 0;
						this.co_j.muki = 0;
						if(!this.j_hashigo_f)
							this.co_j.pt = 100;
						this.gs.rsAddSound(16);
					}
					var i21 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
					if(i21 == 18 || i21 == 19)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
				}
			}
		}
	l29 = this.maps.map_bg[(this.co_j.x + 15) >> 5][(this.co_j.y + 15) >> 5];
	switch(l29)
	{
	case 9: // '\t'
		if(this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][(this.co_j.y + 15) >> 5] == 4)
		{
			this.maps.putBGCode((this.co_j.x + 15) >> 5, (this.co_j.y + 15) >> 5, 4);
			this.j_mizu_f = true;
		} else
		{
			this.maps.putBGCode((this.co_j.x + 15) >> 5, (this.co_j.y + 15) >> 5, 0);
		}
		this.addScore(5);
		this.gs.rsAddSound(6);
		if(this.clear_type == 2 || this.clear_type == 3)
		{
			var l27 = this.coin_kazu;
			this.getCoinTotal();
			if(l27 > 0 && this.coin_kazu == 0)
			{
				this.gs.rsAddSound(7);
				if(this.clear_type == 3)
					this.showHashigo();
			}
		}
		break;

	case 8: // '\b'
		if(this.clear_type != 2 && this.clear_type != 3 || this.coin_kazu <= 0)
		{
			if(this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][(this.co_j.y + 15) >> 5] == 4)
			{
				this.maps.putBGCode((this.co_j.x + 15) >> 5, (this.co_j.y + 15) >> 5, 4);
				this.j_mizu_f = true;
			} else
			{
				this.maps.putBGCode((this.co_j.x + 15) >> 5, (this.co_j.y + 15) >> 5, 0);
			}
			this.gs.rsAddSound(2);
			this.stage_cc = 1;
			if(this.stage_max >= 2 && this.stage >= this.stage_max)
				this.addScore(1000);
			else
				this.addScore(100);
		}
		break;

	case 5: // '\005'
		this.co_j.y = ((this.co_j.y + 15) >> 5) * 32;
		this.jShinu(1);
		break;

	case 6: // '\006'
		this.co_j.y = ((this.co_j.y + 15) >> 5) * 32;
		this.jShinu(1);
		break;
	}
	if(this.clear_type == 3 && this.coin_kazu <= 0 && this.co_j.y <= this.maps.wy_mini - 32 && this.stage_cc <= 0)
	{
		this.stage_cc = 1;
		this.co_j.c = 130;
		this.co_j.c1 = -9999;
		this.addScore(100);
		this.gs.rsAddSound(2);
	}
	if(this.co_j.y >= this.ochiru_y || this.j_mizu_f && this.co_j.y >= this.ochiru_y - 16)
	{
		this.co_j.c = 210;
		this.co_j.c1 = 0;
		this.co_j.y = this.ochiru_y + 64;
		this.j_jet_c = 0;
		this.j_v_c = 0;
	}
	this.moveViewPosition();
}
    function rounddown(val)
{
    if(val >= 0)
        return Math.floor(val);
    else
        return -Math.floor(-val);
}

})();
